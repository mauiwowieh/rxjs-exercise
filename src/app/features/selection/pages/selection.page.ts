import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SelectionInstanceComponent } from '../components/selection-instance/selection-instance.component';

@Component({
  standalone: true,
  selector: 'selection-page',
  imports: [SelectionInstanceComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './selection.page.html',
  styleUrl: './selection.page.css',
})
export class SelectionPageComponent {
  readonly containers = [
    { id: 'judge-a', title: 'Judge A' },
    { id: 'judge-b', title: 'Judge B' },
  ];
}
