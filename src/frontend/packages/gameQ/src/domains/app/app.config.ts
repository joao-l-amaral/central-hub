import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideToastr } from 'ngx-toastr';
import {
  I18nService,
  LoadingBlockService,
  LoggingService,
} from '@central-hub/library';
import { provideGameSelectionHandler } from '../game-selected/api/provide-game-selection-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    provideGameSelectionHandler(),
    I18nService,
    LoggingService,
    LoadingBlockService,
    MatButtonModule,
    MatIconModule,
  ],
};
