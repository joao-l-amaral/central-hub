import {
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { GameQAPI } from '../data-access/gameq-api';
import { GameQConfigurationState } from './configuration-state';

export function provideConfiguration() {
  return makeEnvironmentProviders([
    GameQAPI,
    GameQConfigurationState,
    provideEnvironmentInitializer(() => {
      const gameQApi = inject(GameQAPI);
      const gameQConfigurationState = inject(GameQConfigurationState);

      gameQApi.getConfigurations().then((configurations) => {
        gameQConfigurationState.platforms.set(configurations.platforms);
      });
    }),
  ]);
}
