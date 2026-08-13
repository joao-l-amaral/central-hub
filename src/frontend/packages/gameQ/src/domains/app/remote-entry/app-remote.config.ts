import { provideConfiguration } from '../../initial-search/util-configuration/providers';
import { RequestFactory } from '@central-hub/library';
import { provideRouter } from '@angular/router';
import { appRoutes } from '../app.routes';

export const appRemoteConfig = {
  providers: [provideConfiguration(), provideRouter(appRoutes), RequestFactory],
};
