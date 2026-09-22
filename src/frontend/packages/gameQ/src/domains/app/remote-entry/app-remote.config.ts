import { provideConfiguration } from '../../initial-search/util-configuration/providers';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../app.routes';
import { provideGameSelectionHandler } from '../../game-selected/api/provide-game-selection-handler';

export const appRemoteConfig = {
  providers: [
    provideConfiguration(),
    provideRouter(appRoutes),
    provideGameSelectionHandler(),
  ],
};
