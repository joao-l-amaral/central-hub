import { Route } from '@angular/router';
import {loadRemoteModule} from "@angular-architects/native-federation";

export const appRoutes: Route[] = [
  {
    path: 'shelve-products',
    loadComponent: () => loadRemoteModule('shelveProducts', './Component').then(m => m.App)
  },
  {
    path: 'gameVault',
    loadComponent: () => loadRemoteModule('gameVault', './Component').then(m => m.App)
  }
];
