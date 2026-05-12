import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi, withRequestsMadeViaParent } from '@angular/common/http';
import { I18nService } from '@portal-library';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi(), withRequestsMadeViaParent()),
        I18nService,
        MatButtonModule,
        MatIconModule
    ]
}
