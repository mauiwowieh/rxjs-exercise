import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SelectionStore, SelectionStoreType } from '../../../../state/selection.store';
import { OPTION_GROUPS } from '../../data/options.data';

@Component({
  standalone: true,
  selector: 'option-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './option.selector.component.html',
  styleUrl: './option.selector.component.css',
})
export class OptionSelectorComponent {
  readonly store = inject(SelectionStore) as unknown as SelectionStoreType;
  readonly optionGroups = OPTION_GROUPS;

  select(optionId: number): void {
    this.store.selectOption(optionId);
  }
}
