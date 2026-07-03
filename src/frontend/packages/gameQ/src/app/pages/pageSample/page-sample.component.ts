import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gameq-page-sample-home',
  templateUrl: './page-sample.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSampleComponent {}
