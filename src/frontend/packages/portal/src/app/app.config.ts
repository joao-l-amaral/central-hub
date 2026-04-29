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
import { AppInitService, ApplicationConfigurations, AuthApi, MF_FRONTEND, providerOidcAuth } from '@portal/library';
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
        provideAppInitializer(() => {
          const appInitService = inject(AppInitService);
          const authApi = inject(AuthApi);
          const remotes = (config.remotes as string[]) ?? [];
          appInitService.fetchApplicationConfiguration().then(() => {
              console.info("Application configuration loaded");
              authApi.doAutoLogin();
          });
          appInitService.fetchPortalInternalization();
          if (remotes.length > 0) {
            for (const remote of remotes) {
              appInitService.fetchI18nData(remote).then(() => {
                  console.info(`Fetched i18n data from remote: ${remote}`);
              });
            }
          } else {
            console.error("Remotes not found in module-federation.config.ts");
          }
        }),
        BreadcrumbStateService,
        { provide: MF_FRONTEND, useValue: 'portal' }
    ],
};
