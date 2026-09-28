import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  InternalizationPipe,
  LoadingBlockService,
  SearchInputComponent,
} from '@central-hub/library';
import { Router } from '@angular/router';
import { GamesListDropdownComponent } from '../feature-games-list-dropdown/games-list-dropdown';
import { SearchGameResult } from '../feature-games-list-dropdown/games-list-interface';
import { GameQAPI } from '../data-access/gameq-api';
import { GameData } from '../../game-selected/data-game-selected/game-data';
import { GameState } from '../../game-selected/api';

@Component({
  selector: 'gameq-search',
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SearchInputComponent,
    InternalizationPipe,
    GamesListDropdownComponent,
  ],
  providers: [GameQAPI, GameState, GameData],
})
export class SearchComponent {
  readonly #gameQAPI = inject(GameQAPI);
  readonly #loadingService = inject(LoadingBlockService);
  readonly #router = inject(Router);
  readonly #gameData = inject(GameData);
  readonly #gameState = inject(GameState);

  readonly haveError = input(false);
  readonly showError = computed(() => this.haveError() || this.internalError());

  readonly internalError = signal(false);

  readonly gamesList = signal<SearchGameResult[]>([]);

  protected async onSearchGame($event: string) {
    if (!$event) {
      this.gamesList.set([]);
      return;
    }

    const games = await this.#gameQAPI.initialSearch($event);
    if (games.length === 0) {
      this.internalError.set(!this.showError());
    } else {
      this.gamesList.set(games);
    }
  }

  protected onGameSelected(selectedGame: string) {
    this.#loadingService.show();

    this.#gameData
      .getGame(selectedGame)
      .then((gameData) => {
        this.#gameState.selectName(gameData);
        this.#router.navigate(['gameQ', 'dashboard'], {
          queryParams: { game: selectedGame },
        });
      })
      .finally(() => {
        this.#loadingService.hide();
        this.gamesList.set([]);
      });
  }
}
