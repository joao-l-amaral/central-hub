import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserInfo } from './auth-interface';
import { AuthState } from './auth-state';

@Injectable()
export class AuthApi {

    readonly #httpClient = inject(HttpClient);
    readonly #authState = inject(AuthState);

    public doAutoLogin() {
        this.checkSession()
            .then(userInfo => {
                this.setAuthState(userInfo, true);
            })
    }

    public doManualLogin() {
        this.checkSession()
            .then(userInfo => {
                this.setAuthState(userInfo, true);
            })
            .catch(() => {
                window.location.href = `/auth/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
            })
    }

    public doManualLogout(idToken: string) {
        window.location.href = `/auth/logout?redirect_uri=${encodeURIComponent(window.location.href)}&idToken=${idToken}`;
        this.#authState.restoreState();
    }

    private checkSession() {
        return firstValueFrom(this.#httpClient.get<UserInfo>("/auth/session"));
    }

    private setAuthState(userInfo: UserInfo, isLoggedIn: boolean) {
        this.#authState.state.set({
           isLoggedIn: isLoggedIn,
           userName: userInfo.name,
           idToken: userInfo.idToken
        });
    }
}
