import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { SelectionStore, SelectionStoreType } from '../../../../state/selection.store';
import { BoxComponent } from '../box/box.component';

@Component({
  standalone: true,
  selector: 'boxes-container',
  imports: [BoxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './boxes-container.component.html',
  styleUrl: './boxes-container.component.css',
})
export class BoxesContainerComponent {
  readonly store = inject(SelectionStore) as unknown as SelectionStoreType;
}
