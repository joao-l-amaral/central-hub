import { bootstrapApplication } from '@angular/platform-browser';
import { GameQComponent } from './app/pages/gameQ/gameq.component';
import { appConfig } from './domains/app/app.config';

bootstrapApplication(GameQComponent, appConfig).catch((err) =>
  // eslint-disable-next-line no-console
  console.error(err),
);
