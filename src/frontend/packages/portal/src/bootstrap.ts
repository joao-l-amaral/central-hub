import { bootstrapApplication } from '@angular/platform-browser';
import { appConfigProviders } from './domains/app/app.config';
import { PortalComponent } from './domains/layout/feature-portal/portal';
import { createDynamicRoutes } from './domains/app/app.routes';
import { RemotesConfig } from './domains/remotes/remotes';

export function bootstrap(remotesConfig: RemotesConfig) {
  const routes = createDynamicRoutes(remotesConfig);
  const appConfig = appConfigProviders(routes, remotesConfig);

  return bootstrapApplication(PortalComponent, appConfig);
}
