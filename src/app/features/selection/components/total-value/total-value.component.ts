import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SelectionStore, SelectionStoreType } from '../../../../state/selection.store';

@Component({
  standalone: true,
  selector: 'app-total',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './total-value.component.html',
  styleUrl: './total-value.component.css',
})
export class TotalValueComponent {
  readonly store = inject(SelectionStore) as unknown as SelectionStoreType;
}
