import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LoadingBlockService } from '@central-hub/library';

@Component({
  selector: 'gameq-page-sample-home',
  templateUrl: './page-sample.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSampleComponent implements OnInit {
  readonly #loadingService = inject(LoadingBlockService);

  ngOnInit(): void {
    setTimeout(() => {
      this.#loadingService.hide();
    }, 500000);
  }
}
