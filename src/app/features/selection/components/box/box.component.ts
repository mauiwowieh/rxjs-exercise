import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SelectionStore, SelectionStoreType } from '../../../../state/selection.store';

interface BoxVm {
  isActive: boolean;
  isFilled: boolean;
  label: string;
}

@Component({
  standalone: true,
  selector: 'app-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './box.component.html',
  styleUrl: './box.component.css',
})
export class BoxComponent {
  readonly boxId = input.required<number>();
  private readonly store = inject(SelectionStore) as unknown as SelectionStoreType;

  readonly vm = computed<BoxVm>(() => {
    const boxId = this.boxId();
    const label = this.store.boxLabel(boxId);

    return {
      isActive: this.store.activeBoxId() === boxId,
      isFilled: label !== 'Select element',
      label,
    };
  });

  select(): void {
    this.store.selectBox(this.boxId());
  }
}
