import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { GameState } from './api';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'gameq-game-selected',
  templateUrl: './game-selected.html',
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSelectedComponent {
  readonly #game = inject(GameState);

  readonly selectedGameName = computed(() => this.#game.game());
}
