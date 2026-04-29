import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'sample',
    loadChildren: () => import('sample/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'gameVault',
    loadChildren: () => import('gameVault/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'shelveProducts',
    loadChildren: () => import('shelveProducts/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    loadChildren: () => import('sample/Routes').then((m) => m.remoteRoutes),
  }
];

