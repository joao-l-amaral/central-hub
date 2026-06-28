import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import {
  loadingBlockProviders,
  LoggingService,
  providerInternalization,
  providerOidcAuth,
} from '@portal-library';
import { httpErrorInterceptor } from './utils-interceptors/httperror-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { processApplicationConfigurations } from './utils-application/application-configuration';
import { ApplicationConfigurationService } from './utils-application/application-configuration-service';
import { BreadcrumbStateService } from './feature-breadcrumb/breadcrumb-state';
import { REMOTES_CONFIG, RemotesConfig } from './utils-application/application-remotes-token';

export function appConfigProviders(routes: Route[], remotesConfig: RemotesConfig): ApplicationConfig {
  return {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideHttpClient(
        withInterceptorsFromDi(),
        withInterceptors([httpErrorInterceptor]),
      ),
      provideAnimations(),
      providerOidcAuth(),
      provideToastr({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      loadingBlockProviders(),
      providerInternalization(),
      ApplicationConfigurationService,
      LoggingService,
      BreadcrumbStateService,
      provideAppInitializer(() => {
        processApplicationConfigurations();
      }),
      { provide: REMOTES_CONFIG, useValue: remotesConfig },
    ],
  };
}
