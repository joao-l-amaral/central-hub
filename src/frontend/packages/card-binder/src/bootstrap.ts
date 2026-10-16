import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './domains/app/app.config';
import { CardBinderComponent } from './domains/app/app';

bootstrapApplication(CardBinderComponent, appConfig).catch((err) =>
  // eslint-disable-next-line no-console
  console.error(err),
);
