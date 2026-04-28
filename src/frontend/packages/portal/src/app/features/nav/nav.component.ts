import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthApi, AuthState } from '@portal/library';
import { MatIcon } from '@angular/material/icon';

@Component({
    imports: [RouterModule, MatIcon],
    selector: 'portal-nav-bar',
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
    protected title = 'Central-hub';

    readonly #authApi = inject(AuthApi);
    readonly #authState = inject(AuthState);

    readonly authState = computed(() => this.#authState.state());

    onLogin() {
        this.#authApi.doManualLogin();
    }

    onLogout() {
        this.#authApi.doManualLogout(this.authState().idToken);
    }
}
