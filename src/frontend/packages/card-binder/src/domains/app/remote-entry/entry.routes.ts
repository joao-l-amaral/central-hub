import { Route } from '@angular/router';
import { BinderComponent } from '../../binder/binder';
import { appRemoteConfig } from './app-remote.config';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: appRemoteConfig.providers,
    component: BinderComponent,
  },
];
