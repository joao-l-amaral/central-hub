import { bootstrapApplication } from '@angular/platform-browser';
import { appConfigProviders } from './app/app.config';
import { Portal } from './app/feature-portal/portal';
import { RemotesConfig } from './app/utils-application/application-remotes-token';
import { createDynamicRoutes } from './app/util-routes/app.routes';

export function bootstrap(remotesConfig: RemotesConfig) {
  const routes = createDynamicRoutes(remotesConfig);
  const appConfig = appConfigProviders(routes, remotesConfig);

  return bootstrapApplication(Portal, appConfig);
}
