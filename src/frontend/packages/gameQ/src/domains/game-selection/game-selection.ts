import {
  ChangeDetectionStrategy,
  Component, computed,
  inject
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  DataTableCell,
  DtCellTemplateDirective,
  HeaderComponent,
  InternalizationPipe,
  PaginationPage,
  RemoteDataSource,
  RequestFactory,
  TableDtComponent,
  TRow,
} from '@central-hub/library';
import { GameSelectionInterface } from './game-selection-interface';
import { GameQConfigurationState } from '../initial-search/util-configuration/configuration-state';

@Component({
  selector: 'gameq-game-selection',
  templateUrl: './game-selection.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableDtComponent,
    DataTableCell,
    DtCellTemplateDirective,
    InternalizationPipe,
    HeaderComponent,
  ],
})
export class GameSelectionComponent {
  readonly #route = inject(ActivatedRoute);
  readonly #requestFactory = inject(RequestFactory);
  readonly #gameQConfigurationState = inject(GameQConfigurationState);

  readonly platform = toSignal(
    this.#route.queryParamMap.pipe(map((params) => params.get('platform'))),
    { initialValue: null },
  );

  readonly platformIcon = computed(() => {
    const platformIconByName = this.#gameQConfigurationState.getPlatformIconByName(this.platform());
    return platformIconByName || 'bi bi-list-ul';
  });

  readonly requestUrl = computed(() => {
    const platform = this.platform();
    return platform
      ? `/api/gameq/games?platform=${platform}`
      : '/api/gameq/games';
  });

  readonly #requestSubject$ = (
    search: string,
    page: number,
    pageSize: number,
    sortOrder: string,
  ) =>
    this.#requestFactory.get<PaginationPage<GameSelectionInterface>>(
      this.requestUrl(),
      {
        params: { search, page, pageSize, sortOrder },
      },
    );

  readonly dataSource = new RemoteDataSource<GameSelectionInterface>(
    this.#requestSubject$,
  );

  protected rowClicked($event: TRow) {
    console.log($event);
  }
}
