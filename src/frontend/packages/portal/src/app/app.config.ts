import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import {
  AuthApi,
  I18nInitialization,
  loadingBlockProviders,
  LoggingService,
  providerInternalization,
  providerOidcAuth, SessionStorage
} from '@portal-library';
import { httpErrorInterceptor } from './commons/interceptors/httperror-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BreadcrumbStateService } from './features/breadcrumb/breadcrumb-state';
import { firstValueFrom } from 'rxjs';
import { ApplicationConfiguration } from './commons/models/application-configuration';
import { ApplicationConfigurationService } from './commons/services/application-configuration-service';

function processSharedApplicationConfigurations() {
  const logger = inject(LoggingService);
  const i18nInitialization = inject(I18nInitialization);
  const remotes = JSON.parse(
    sessionStorage.getItem('federationManifest') ?? '{}',
  ) as string[];
  if (remotes.length > 0) {
    for (const remote of remotes) {
      i18nInitialization.fetchI18nData(remote).then(() => {
        logger.log(`Fetched i18n data from remote: ${remote}`);
        i18nInitialization.increaseNumberOfLoadedDictionary();
      });
    }
  } else {
    logger.log('Remotes not found in module-federation.config.ts');
  }
}

function processApplicationConfigurations() {
  const httpClient = inject(HttpClient);
  const applicationConfigurationService = inject(
    ApplicationConfigurationService,
  );
  const authApi = inject(AuthApi);

  firstValueFrom(
    httpClient.get<ApplicationConfiguration>('/api/configurations'),
  ).then((config) => {
    const isAuthActivate = config.isAuthActivate;
    applicationConfigurationService.isAuthActivate.set(isAuthActivate);

    if (isAuthActivate) {
      authApi.doAutoLogin();
    }
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
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
    SessionStorage,
    provideAppInitializer(() => {
      processSharedApplicationConfigurations();
      processApplicationConfigurations();
    }),
    BreadcrumbStateService,
  ],
};
