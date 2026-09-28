import { Injectable, signal } from '@angular/core';
import { Game } from '../data-game-selected/game';

@Injectable()
export class GameState {
  readonly game = signal<Partial<Game>>({});

  selectName(game: Game) {
    this.game.update((prevGame) => ({
      ...prevGame,
      game,
    }));
  }

}
