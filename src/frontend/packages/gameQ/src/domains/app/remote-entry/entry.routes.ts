import { Route } from '@angular/router';
import { InitialSearchComponent } from '../../initial-search/initial-search';
import {
  PageResourcesComponentConfig,
  SideBarNavigationComponent,
} from '@central-hub/library';
import { appRemoteConfig } from './app-remote.config';
import { Administration } from '../../administration/administration';
import { GameSelectedComponent } from '../../game-selected/game-selected';
import { GameListComponent } from '../../game-list/game-list';
import { gameGuard } from '../../game-selected/api/game.guard';

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
        component: GameListComponent,
      },
      {
        path: 'administration',
        component: Administration,
      },
      {
        path: 'dashboard',
        component: SideBarNavigationComponent,
        canActivate: [gameGuard],
        data: {
          config: {
            resources: [
              {
                icon: 'bi bi-controller',
                label: 'gameq.selected.game',
                component: GameSelectedComponent,
                queryParam: 'game',
              },
              {
                icon: 'bi bi-list-ul',
                label: 'gameq.game.list.header.title',
                component: GameListComponent,
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
