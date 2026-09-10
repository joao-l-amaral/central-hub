import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './domains/app/app.config';
import { GameSelectionComponent } from './domains/app/app';

bootstrapApplication(GameSelectionComponent, appConfig).catch((err) =>
  // eslint-disable-next-line no-console
  console.error(err),
);
