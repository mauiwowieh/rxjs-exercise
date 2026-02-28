import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { SelectionStore, SelectionStoreType } from '../../../../state/selection.store';
import { BoxesContainerComponent } from '../boxes-container/boxes-container.component';
import { ClearButtonComponent } from '../clear-button/clear-button.component';
import { OptionSelectorComponent } from '../option-selector/option.selector.component';
import { TotalValueComponent } from '../total-value/total-value.component';

@Component({
    selector: 'selection-instance',
    imports: [
        BoxesContainerComponent,
        ClearButtonComponent,
        TotalValueComponent,
        OptionSelectorComponent,
    ],
    providers: [SelectionStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './selection-instance.component.html',
    styleUrl: './selection-instance.component.css'
})
export class SelectionInstanceComponent implements OnInit {
  readonly containerId = input.required<string>();
  readonly title = input<string>();
  readonly store = inject(SelectionStore) as unknown as SelectionStoreType;

  ngOnInit(): void {
    this.store.init(this.containerId());
  }
}
