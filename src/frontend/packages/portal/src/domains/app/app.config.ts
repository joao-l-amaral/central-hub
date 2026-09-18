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
  LoggingService,
  provideLoadingBlock,
  providerInternalization,
  providerOidcAuth,
} from '@central-hub/library';
import { httpErrorInterceptor } from './util-interceptors/http-error-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { processApplicationConfigurations } from './app-configuration';
import { ApplicationConfigurationService } from '../shared/util-application/application-configuration-service';
import { BreadcrumbStateService } from '../layout/feature-breadcrumb/breadcrumb-state';
import { RemotesConfig } from './util-remotes/remotes';
import { httpCacheInterceptor } from './util-interceptors/http-cache-interceptor';
import { providerRemotesStatus } from './util-remotes/providers';

export function appConfigProviders(
  routes: Route[],
  remotesConfig: RemotesConfig,
): ApplicationConfig {
  return {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideHttpClient(
        withInterceptorsFromDi(),
        withInterceptors([httpErrorInterceptor, httpCacheInterceptor]),
      ),
      provideAnimations(),
      providerOidcAuth(),
      provideToastr({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      provideLoadingBlock(),
      providerInternalization(),
      ApplicationConfigurationService,
      LoggingService,
      BreadcrumbStateService,
      providerRemotesStatus(remotesConfig),
      provideAppInitializer(() => {
        processApplicationConfigurations();
      }),
    ],
  };
}
