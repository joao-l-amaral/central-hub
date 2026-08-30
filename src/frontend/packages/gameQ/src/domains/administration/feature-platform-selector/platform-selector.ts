import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  DataTableCell,
  DtCellTemplateDirective,
  InternalizationPipe,
  PaginationPage,
  RemoteDataSource,
  RequestFactory,
  TableDtComponent,
  TRow,
} from '@central-hub/library';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';
import { GameQConfigurationState } from '../../initial-search/util-configuration/configuration-state';

@Component({
  selector: 'gameq-platform-selector',
  templateUrl: './platform-selector.html',
  styleUrl: './platform-selector.scss',
  imports: [
    DataTableCell,
    DtCellTemplateDirective,
    InternalizationPipe,
    TableDtComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformSelectorComponent {
  readonly #requestFactory = inject(RequestFactory);
  readonly #gameqAdministrationApi = inject(GameqAdministrationApi);
  readonly #gameQConfigurationState = inject(GameQConfigurationState);

  readonly #requestSubject$ = (
    search: string | undefined,
    page: number,
    pageSize: number,
    sortOrder: string | undefined,
  ) =>
    this.#requestFactory.get<PaginationPage<string>>(
      '/api/gameq/administration/listOfPlatforms',
      {
        params: { search, page, pageSize, sortOrder },
      },
    );

  readonly dataSource = new RemoteDataSource<string>(this.#requestSubject$);

  protected onRowClicked(row: TRow) {
    const platformName = row['platformName'] as string;
    const isSelected = !row.selected;

    this.#gameqAdministrationApi
      .updateSelectedConsole(platformName, isSelected)
      .then(() => {
        this.#gameQConfigurationState.updatePlatformStatus(platformName, isSelected);
        this.dataSource.reload();
      });
  }
}
