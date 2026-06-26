import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthApi, AuthState, InternalizationPipe, SessionStorage } from '@portal-library';
import { MatIcon } from '@angular/material/icon';
import { ApplicationConfigurationService } from '../../commons/services/application-configuration-service';

@Component({
  imports: [RouterModule, MatIcon, InternalizationPipe],
  selector: 'ch-nav-bar',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected title = 'Central-hub';

  readonly #authApi = inject(AuthApi);
  readonly #authState = inject(AuthState);
  readonly #applicationConfigurationService = inject(
    ApplicationConfigurationService,
  );
  readonly #sessionStorage = inject(SessionStorage);

  readonly remotes = this.#sessionStorage.getRemotes();

  isAuthActivate = this.#applicationConfigurationService.isAuthActivate();

  readonly authState = computed(() => this.#authState.state());

  onLogin() {
    this.#authApi.doManualLogin();
  }

  onLogout() {
    this.#authApi.doManualLogout(this.authState().idToken);
  }
}
