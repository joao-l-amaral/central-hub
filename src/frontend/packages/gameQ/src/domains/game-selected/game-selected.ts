import { Component, computed, inject } from '@angular/core';
import { GameState } from './api/game';

@Component({
  selector: 'gameq-game-selected',
  templateUrl: './game-selected.html',
  imports: [],
})
export class GameSelectedComponent {
  readonly #game = inject(GameState);

  readonly selectedGameName = computed(() => this.#game.game().name);
}
