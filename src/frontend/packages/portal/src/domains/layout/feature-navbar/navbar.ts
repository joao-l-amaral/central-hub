import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthApi, AuthState } from '@portal-library';
import { MatIcon } from '@angular/material/icon';
import { ApplicationConfigurationService } from '../../shared/util-application/application-configuration-service';
import { REMOTES_CONFIG } from '../../shared/util-application/application-remotes-token';

@Component({
  imports: [RouterModule, MatIcon],
  selector: 'ch-nav-bar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected title = 'Central-hub';

  readonly #authApi = inject(AuthApi);
  readonly #authState = inject(AuthState);
  readonly #applicationConfigurationService = inject(
    ApplicationConfigurationService,
  );
  readonly remotes = inject(REMOTES_CONFIG);

  isAuthActivate = this.#applicationConfigurationService.isAuthActivate();

  readonly authState = computed(() => this.#authState.state());

  onLogin() {
    this.#authApi.doManualLogin();
  }

  onLogout() {
    this.#authApi.doManualLogout(this.authState().idToken);
  }
}
