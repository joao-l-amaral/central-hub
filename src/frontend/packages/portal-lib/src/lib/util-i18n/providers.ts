import { inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { I18nService } from './i18n-service';
import { I18nInitialization } from './i18n-initialization';

export function providerInternalization() {
  return makeEnvironmentProviders([
    I18nService,
    I18nInitialization,
    provideAppInitializer(async () => {
      const i18nInitialization = inject(I18nInitialization);
      await i18nInitialization.fetchI18nData();
    }),
  ]);
}
