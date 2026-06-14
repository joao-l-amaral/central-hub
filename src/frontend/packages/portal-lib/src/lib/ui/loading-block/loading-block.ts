import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {LoadingBlockService} from "./loading-block-service";

@Component({
  selector: 'lib-loading-block',
  templateUrl: './loading-block.html',
  styleUrls: ['./loading-block.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBlockComponent {
  readonly #loadingBlockService = inject(LoadingBlockService);

  readonly loading = input.required<boolean>();

  readonly isLoading = computed(() => {
    return this.#loadingBlockService.loading() || this.loading();
  })
}
