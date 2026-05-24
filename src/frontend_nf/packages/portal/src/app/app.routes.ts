import { Route } from '@angular/router';
import {loadRemoteModule} from "@angular-architects/native-federation";

export const appRoutes: Route[] = [
  {
    path: 'shelveProducts',
    loadChildren: () => loadRemoteModule('shelveProducts', './Routes').then(m => m.remoteRoutes)
  },
  {
    path: 'gameVault',
    loadChildren: () => loadRemoteModule('gameVault', './Routes').then(m => m.remoteRoutes)
  }
];

