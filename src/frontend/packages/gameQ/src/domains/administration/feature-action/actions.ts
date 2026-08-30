import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ButtonComponent,
  I18nService,
  InternalizationPipe,
} from '@central-hub/library';
import { ToastrService } from 'ngx-toastr';
import { GamePlatformApiService } from '../../../app/data-source/game-platform-api.service';

@Component({
  selector: 'gameq-actions-administration',
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
  imports: [InternalizationPipe, ButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Actions {
  readonly #gamePlatformApiService = inject(GamePlatformApiService);
  readonly #i18nService = inject(I18nService);
  readonly #toastr = inject(ToastrService);

  readonly isLoading = signal(false);

  onForceGamesUpdate() {
    this.isLoading.set(true);
    this.#gamePlatformApiService.forceGameSynchronization().then(() => {
      this.isLoading.set(false);
      const successMsg = this.#i18nService.translate('gameq.game.sync.success');
      this.#toastr.success(successMsg);
    });
  }
}
