import { loadRemoteModule } from '@angular-architects/native-federation';
import { I18nInitialization } from '@central-hub/library';
import { inject } from '@angular/core';
import { RemotesConfig } from '../remotes/remotes';
import { remoteStatusGuard } from '../remotes/api';
import { ErrorPageComponent } from '../layout/feature-error-page/error-page';

function createRemoteI18nResolver(remoteName: string) {
  return () => {
    const i18n = inject(I18nInitialization);
    return i18n.fetchI18nData(remoteName);
  };
}

export function createDynamicRoutes(remotesConfig: RemotesConfig) {
  const remoteRoutes = remotesConfig.map((remote) => ({
    path: remote.name,
    resolve: { i18n: createRemoteI18nResolver(remote.name) },
    canMatch: [remoteStatusGuard],
    loadChildren: () =>
      loadRemoteModule(remote.name, './Routes').then((m) => m.remoteRoutes),
  }));

  const routes = [
    ...remoteRoutes,
    {
      path: 'error',
      component: ErrorPageComponent
    }
  ]


  return routes;
}
