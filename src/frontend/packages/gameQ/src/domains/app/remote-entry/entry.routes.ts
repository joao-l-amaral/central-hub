import { Route } from '@angular/router';
import { InitialSearchComponent } from '../../initial-search/initial-search';
import {
  PageResourcesComponentConfig,
  SideBarNavigationComponent,
} from '@central-hub/library';
import { PageSampleComponent } from '../../../app/pages/pageSample/page-sample.component';
import { AdministrationComponent } from '../../../app/pages/administration/administration.component';
import { GameSelectionComponent } from '../../game-selection/game-selection';
import { appRemoteConfig } from './app-remote.config';

export const remoteRoutes: Route[] = [
  {
    path: '',
    providers: appRemoteConfig.providers,
    children: [
      {
        path: '',
        component: InitialSearchComponent,
      },
      {
        path: 'games',
        component: GameSelectionComponent,
      },
      {
        path: 'dashboard',
        component: SideBarNavigationComponent,
        data: {
          config: {
            resources: [
              {
                icon: 'bi bi-playstation',
                label: 'test.ps',
                component: PageSampleComponent,
              },
              {
                icon: 'bi bi-list-ul',
                label: 'gameq.game.list.header.title',
                component: GameSelectionComponent,
              },
              {
                icon: 'bi bi-xbox',
                label: 'test.xbox',
                component: AdministrationComponent,
              },
            ],
          } as PageResourcesComponentConfig,
        },
      },
    ],
  },
];
