import { Injectable, signal } from '@angular/core';

export interface Game {
  name: string;
}

@Injectable()
export class GameState {
  readonly game = signal<Partial<Game>>({});

  selectName(name: string) {
    this.game.update((game) => ({
      ...game,
      name,
    }));
  }
}
