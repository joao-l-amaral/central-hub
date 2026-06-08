import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PortalComponent } from './app/portal.component';

bootstrapApplication(PortalComponent, appConfig).catch((err) =>
  // eslint-disable-next-line no-console
  console.error(err),
);
