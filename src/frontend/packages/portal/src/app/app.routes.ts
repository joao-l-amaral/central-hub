import { Route } from '@angular/router';
import {loadRemoteModule} from "@angular-architects/native-federation";

export const appRoutes: Route[] = [
  {
    path: 'shelveProducts',
    loadChildren: () => loadRemoteModule('shelveProducts', './Routes').then(m => m.remoteRoutes)
  },
  {
    path: 'gameQ',
    loadChildren: () => loadRemoteModule('gameQ', './Routes').then(m => m.remoteRoutes)
  }
];

