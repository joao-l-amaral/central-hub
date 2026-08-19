import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchGameResult } from './games-list-interface';

@Component({
  selector: 'gameq-games-list-dropdown',
  templateUrl: './games-list-dropdown.html',
  styleUrl: './games-list-dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class GamesListDropdownComponent {
  readonly games = input.required<SearchGameResult[]>();
  readonly gameSelector = output<string>();

  readonly isOpen = computed(() => {
    return this.games().length > 0;
  });

  protected selectGame(game: string) {
    this.gameSelector.emit(game);
  }
}
