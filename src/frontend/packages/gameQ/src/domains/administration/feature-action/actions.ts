import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonComponent, InternalizationPipe } from '@central-hub/library';
import { ToastrService } from 'ngx-toastr';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';

@Component({
  selector: 'gameq-actions-administration',
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
  imports: [ButtonComponent, InternalizationPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Actions {
  readonly #gameqAdministrationApi = inject(GameqAdministrationApi);
  readonly #toastr = inject(ToastrService);

  readonly isLoading = signal(false);

  onForceGamesUpdate() {
    this.isLoading.set(true);
    this.#gameqAdministrationApi.doSynchronizeGames()
      .then((response) => {
        const message = response.message ?
          response.message :
          `Platforms: ${response.numberOfPlatformsImported}, Games: ${response.numberOfGamesImported}`;

        this.#toastr.success(message);
      })
      .finally(() => {
        this.isLoading.set(false);
      })
  }
}
