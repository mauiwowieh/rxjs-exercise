// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'frontend-rxjs';
// }

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SelectionPageComponent } from './features/selection/pages/selection.page';

@Component({
    selector: 'app-root',
    imports: [SelectionPageComponent],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
