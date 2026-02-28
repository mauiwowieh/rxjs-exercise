import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SelectionStore, SelectionStoreType } from '../../../../state/selection.store';

@Component({
  standalone: true,
  selector: 'clear-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './clear-button.component.html',
  styleUrl: './clear-button.component.css',
})
export class ClearButtonComponent {
  private readonly store = inject(SelectionStore) as unknown as SelectionStoreType;

  clearCurrent(): void {
    this.store.clearCurrentBox();
  }

  clear(): void {
    this.store.clear();
  }
}
