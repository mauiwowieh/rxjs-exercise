import { computed, inject, Signal } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Box } from '../core/models/box.model';
import { SelectionState } from '../core/models/selection-state.model';
import { StorageService } from '../core/services/storage.service';
import { OPTIONS } from '../features/selection/data/options.data';
import { APP_CONFIG } from '../config/app.config.constant';

type SelectionStoreState = SelectionState & {
  panelVisible: boolean;
  containerId: string;
};

function buildInitialState(): SelectionState {
  return {
    activeBoxId: 0,
    boxes: Array.from({ length: APP_CONFIG.BOX_COUNT }, (_, i) => ({
      id: i,
      selectedOptionId: null,
    })),
  };
}

const initialState: SelectionStoreState = {
  ...buildInitialState(),
  panelVisible: false,
  containerId: 'default',
};

export const SelectionStore = signalStore(
  withState(initialState),
  withComputed(({ boxes, activeBoxId }: { boxes: Signal<Box[]>; activeBoxId: Signal<number> }) => ({
    activeBox: computed(() => boxes().find((b) => b.id === activeBoxId()) ?? boxes()[0]),
    total: computed(() =>
      boxes().reduce((sum: number, box) => {
        if (box.selectedOptionId === null) return sum;
        const opt = OPTIONS.find((o) => o.id === box.selectedOptionId);
        return sum + (opt?.value ?? 0);
      }, 0)
    ),
    boxesWithValues: computed(() =>
      boxes().map((box) => ({
        id: box.id,
        value:
          box.selectedOptionId !== null
            ? (OPTIONS.find((o) => o.id === box.selectedOptionId)?.value ?? null)
            : null,
      }))
    ),
  })),
  // store: any is required here — this version of NgRx Signals does not propagate
  // the accumulated store type into the withMethods factory parameter.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withMethods((store: any, storage = inject(StorageService)) => {
    const getStorageKey = (containerId: string) =>
      `${APP_CONFIG.STORAGE_PREFIX}:${containerId}`;

    const persistState = (state: SelectionState) => {
      storage.save(getStorageKey(store.containerId()), state);
    };

    const getBox = (id: number) => store.boxes().find((b: Box) => b.id === id);

    return {
      init(containerId: string): void {
        const storageKey = getStorageKey(containerId);
        const persistedState = storage.load(storageKey);
        const newState = persistedState ?? buildInitialState();

        patchState(store, {
          containerId,
          ...newState,
        });
      },

      box(id: number) {
        return getBox(id);
      },

      boxLabel(id: number): string {
        const box = getBox(id);
        if (!box || box.selectedOptionId === null) return 'Select element';
        return OPTIONS.find((o) => o.id === box.selectedOptionId)?.label ?? 'Select element';
      },

      selectBox(id: number): void {
        patchState(store, { activeBoxId: id, panelVisible: true });
      },

      selectOption(optionId: number): void {
        const { activeBoxId, boxes } = store;
        const updatedBoxes = (boxes() as Box[]).map((box) =>
          box.id === activeBoxId() ? { ...box, selectedOptionId: optionId } : box
        );
        const nextActive =
          activeBoxId() < APP_CONFIG.BOX_COUNT - 1 ? activeBoxId() + 1 : activeBoxId();

        patchState(store, {
          boxes: updatedBoxes,
          activeBoxId: nextActive,
        });

        persistState({
          boxes: updatedBoxes,
          activeBoxId: nextActive,
        });
      },

      clear(): void {
        const newState = buildInitialState();
        patchState(store, newState);
        persistState(newState);
      },

      clearCurrentBox(): void {
        const { activeBoxId, boxes } = store;
        const updatedBoxes = (boxes() as Box[]).map((box) =>
          box.id === activeBoxId() ? { ...box, selectedOptionId: null } : box
        );

        patchState(store, {
          boxes: updatedBoxes,
        });

        persistState({
          boxes: updatedBoxes,
          activeBoxId: activeBoxId(),
        });
      },

      togglePanel(): void {
        patchState(store, (state: SelectionStoreState) => ({
          panelVisible: !state.panelVisible,
        }));
      },
    };
  })
);

/**
 * Explicit store interface — used for injection in components because
 * `withMethods((store: any, ...))` prevents TypeScript from propagating
 * the inferred store type out of `signalStore()` in NgRx Signals v17.
 */
export interface SelectionStoreType {
  // State signals
  readonly boxes: Signal<Box[]>;
  readonly activeBoxId: Signal<number>;
  readonly panelVisible: Signal<boolean>;
  readonly containerId: Signal<string>;
  // Computed signals
  readonly activeBox: Signal<Box | undefined>;
  readonly total: Signal<number>;
  readonly boxesWithValues: Signal<{ id: number; value: number | null }[]>;
  // Methods
  init(containerId: string): void;
  box(id: number): Box | undefined;
  boxLabel(id: number): string;
  selectBox(id: number): void;
  selectOption(optionId: number): void;
  clear(): void;
  clearCurrentBox(): void;
  togglePanel(): void;
}
