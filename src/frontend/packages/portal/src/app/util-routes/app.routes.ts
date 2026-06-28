import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { I18nInitialization } from '@portal-library';
import { inject } from '@angular/core';
import { RemotesConfig } from '../utils-application/application-remotes-token';

function createRemoteI18nResolver(remoteName: string) {
  return () => {
    const i18n = inject(I18nInitialization);
    return i18n.fetchI18nData(remoteName);
  };
}

export function createDynamicRoutes(remotesConfig: RemotesConfig) {
  const routes: Route[] = [];

  for (const remote of remotesConfig) {
    routes.push({
      path: remote.name,
      resolve: { i18n: createRemoteI18nResolver(remote.name) },
      loadChildren: () =>
        loadRemoteModule(remote.name, './Routes').then((m) => m.remoteRoutes),
    });
  }

  return routes;
}
