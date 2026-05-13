import {
    ApplicationConfig,
    inject,
    provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import config from '../../module-federation.config';
import { AppInitService, ApplicationConfigurations, AuthApi, MF_FRONTEND, providerOidcAuth, LoggingService } from '@portal-library';
import { httpErrorInterceptor } from './commons/interceptors/httperror-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BreadcrumbStateService } from './features/breadcrumb/breadcrumb-state';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(
          withInterceptorsFromDi(),
          withInterceptors([httpErrorInterceptor])
        ),
        provideAnimations(),
        providerOidcAuth(),
        provideToastr({
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
        AppInitService,
        ApplicationConfigurations,
        LoggingService,
        provideAppInitializer(() => {
          const logger = inject(LoggingService);
          const appInitService = inject(AppInitService);
          const authApi = inject(AuthApi);
          const remotes = (config.remotes as string[]) ?? [];
          appInitService.fetchApplicationConfiguration().then(() => {
              logger.log("Application configuration loaded");

              authApi.doAutoLogin();
          });
          appInitService.fetchPortalInternalization();
          if (remotes.length > 0) {
            for (const remote of remotes) {
              appInitService.fetchI18nData(remote).then(() => {
                  logger.log(`Fetched i18n data from remote: ${remote}`);
              });
            }
          } else {
            logger.log("Remotes not found in module-federation.config.ts");
          }
        }),
        BreadcrumbStateService,
        { provide: MF_FRONTEND, useValue: 'portal' },
    ],
};
