import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthApi, AuthState } from '@central-hub/library';
import { MatIcon } from '@angular/material/icon';
import { ApplicationConfigurationService } from '../../shared/util-application/application-configuration-service';
import { RemoteRegistry } from '../../remotes/remote-registry';

@Component({
  imports: [RouterModule, MatIcon],
  selector: 'ch-nav-bar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected title = 'Central-hub';

  readonly #remotes = inject(RemoteRegistry);
  readonly #authApi = inject(AuthApi);
  readonly #authState = inject(AuthState);
  readonly #applicationConfigurationService = inject(
    ApplicationConfigurationService,
  );

  readonly remotes = this.#remotes.remotes();

  isAuthActivate = this.#applicationConfigurationService.isAuthActivate;

  readonly authState = computed(() => this.#authState.state());

  onLogin() {
    this.#authApi.doManualLogin();
  }

  onLogout() {
    this.#authApi.doManualLogout(this.authState().idToken);
  }
}
