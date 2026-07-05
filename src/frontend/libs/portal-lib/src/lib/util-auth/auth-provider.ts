import { makeEnvironmentProviders } from '@angular/core';
import { AuthApi } from './auth-api';
import { AuthState } from './auth-state';

export function providerOidcAuth() {
    return makeEnvironmentProviders([
        AuthApi,
        AuthState
    ]);
}
