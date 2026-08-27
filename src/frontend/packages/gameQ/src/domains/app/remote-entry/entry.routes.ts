import { Route } from '@angular/router';
import { InitialSearchComponent } from '../../initial-search/initial-search';
import {
  PageResourcesComponentConfig,
  SideBarNavigationComponent,
} from '@central-hub/library';
import { PageSampleComponent } from '../../../app/pages/pageSample/page-sample.component';
import { GameSelectionComponent } from '../../game-selection/game-selection';
import { appRemoteConfig } from './app-remote.config';
import { Administration } from '../../administration/administration';

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
        path: 'administration',
        component: Administration,
      },
      {
        path: 'dashboard',
        component: SideBarNavigationComponent,
        data: {
          config: {
            resources: [
              {
                icon: 'bi bi-controller',
                label: 'test.ps',
                queryParam: 'game',
                component: PageSampleComponent,
              },
              {
                icon: 'bi bi-list-ul',
                label: 'gameq.game.list.header.title',
                component: GameSelectionComponent,
              },
              {
                icon: 'bi bi-gear',
                label: 'gameq.administrator.side-nav.title',
                component: Administration,
              },
            ],
          } as PageResourcesComponentConfig,
        },
      },
    ],
  },
];
