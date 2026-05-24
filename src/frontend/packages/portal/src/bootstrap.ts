import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PortalComponent } from './app/portal.component';

bootstrapApplication(PortalComponent, appConfig).catch((err) =>
  console.error(err),
);
