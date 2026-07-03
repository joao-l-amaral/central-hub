import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigurationService } from '../shared/util-application/application-configuration-service';
import { firstValueFrom } from 'rxjs';
import {AuthApi} from "@central-hub/library";

export interface AppConfiguration {
    isAuthActivate: boolean
}

export function processApplicationConfigurations() {
  const httpClient = inject(HttpClient);
  const applicationConfigurationService = inject(
    ApplicationConfigurationService,
  );
  const authApi = inject(AuthApi);

  firstValueFrom(
    httpClient.get<AppConfiguration>('/api/configurations'),
  ).then((config) => {
    const isAuthActivate = config.isAuthActivate;
    applicationConfigurationService.isAuthActivate.set(isAuthActivate);

    if (isAuthActivate) {
      authApi.doAutoLogin();
    }
  });
}
