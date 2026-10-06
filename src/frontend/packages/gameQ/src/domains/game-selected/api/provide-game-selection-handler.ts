import {
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { GameState } from './game';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameData } from '../data-game-selected/game-data';

export function provideGameSelectionHandler() {
  return makeEnvironmentProviders([
    GameData,
    GameState,
    provideEnvironmentInitializer(() => {
      const router = inject(Router);
      const gameState = inject(GameState);
      const gameData = inject(GameData);

      const navigationEnd$ = router.events.pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
        map(() => router.routerState.snapshot.root),
        distinctUntilChanged(),
      );

      navigationEnd$.pipe(takeUntilDestroyed()).subscribe((route) => {
        const game = route.queryParamMap.get('game') ?? undefined;

        if (game) {
          gameData.getSelectedGame(game).then((gameData) => {
            gameState.selectGame(gameData);
          });
        }
      });
    }),
  ]);
}
