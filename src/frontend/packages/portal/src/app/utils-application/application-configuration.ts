import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigurationService } from './application-configuration-service';
import { AuthApi } from '@portal-library';
import { firstValueFrom } from 'rxjs';

export interface ApplicationConfiguration {
    isAuthActivate: boolean
}

export function processApplicationConfigurations() {
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
