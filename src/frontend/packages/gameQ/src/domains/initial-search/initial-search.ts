import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  AlertComponent,
  ButtonComponent,
  CircleComponent,
  InternalizationPipe,
  LoadingBlockService,
  SearchInputComponent,
} from '@central-hub/library';
import { GameQConfigurationState } from './util-configuration/configuration-state';
import { TooltipDirective } from 'ngx-smart-tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GamesListDropdownComponent } from './feature-games-list-dropdown/games-list-dropdown';
import { GameQAPI } from './data-access/gameq-api';
import { SearchGameResult } from './feature-games-list-dropdown/games-list-interface';

@Component({
  selector: 'gameq-initial-search',
  templateUrl: './initial-search.html',
  styleUrl: './initial-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CircleComponent,
    SearchInputComponent,
    InternalizationPipe,
    TooltipDirective,
    AlertComponent,
    RouterLink,
    GamesListDropdownComponent,
  ],
})
export class InitialSearchComponent {
  showError = false;
  readonly #gameQConfigurationState = inject(GameQConfigurationState);
  readonly #gameQAPI = inject(GameQAPI);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #loadingService = inject(LoadingBlockService);

  readonly gamesList = signal<SearchGameResult[]>([]);

  readonly platforms = computed(() =>
    this.#gameQConfigurationState.platforms(),
  );

  protected onConfigurationSelect() {
    alert('navegar para a pagina de navegação');
  }

  protected async onSearchGame($event: string) {
    if (!$event) {
      this.gamesList.set([]);
      return;
    }

    const games = await this.#gameQAPI.initialSearch($event);
    if (games.length === 0) {
      this.showError = !this.showError;
    } else {
      this.gamesList.set(games);
    }
  }

  protected onGameSelected($event: string) {
    this.#loadingService.show();
    this.#router.navigate([`dashboard`], {
      queryParams: { game: $event },
      relativeTo: this.#route,
    });
  }
}
