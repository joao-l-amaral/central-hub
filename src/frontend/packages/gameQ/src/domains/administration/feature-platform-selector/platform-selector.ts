import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DataTableCell, DtCellTemplateDirective, InternalizationPipe, PaginationPage, RemoteDataSource,
  RequestFactory, TableDtComponent } from '@central-hub/library';
import { Platforms } from '../../../app/interfaces/game-platforms.interface';

@Component({
  selector: 'gameq-platform-selector',
  templateUrl: './platform-selector.html',
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

  readonly #requestSubject$ = (
    search: string,
    page: number,
    pageSize: number,
    sortOrder: string,
  ) =>
    this.#requestFactory.get<PaginationPage<Platforms>>(
      '/api/gameq/administrarion/listOfPlatforms',
      {
        params: { search, page, pageSize, sortOrder },
      },
    );

  readonly dataSource = new RemoteDataSource<Platforms>(this.#requestSubject$);
}
