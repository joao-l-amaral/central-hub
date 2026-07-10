import {ChangeDetectionStrategy, Component, contentChildren, input} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCol} from "./feature-data-table-cell/data-table-cell";
import {TableDtHeaderComponent} from "./feature-data-table-cell/header/header";
import {DataSource} from './data-table.types';
import {derivedAsync} from "ngxtension/derived-async";
import {SearchInputComponent} from "@central-hub/library";
import {PaginatorComponent} from "./feature-paginator/paginator";

@Component({
  selector: 'lib-table-dt',
  templateUrl: 'data-table.html',
  styleUrl: 'data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    TableDtHeaderComponent,
    SearchInputComponent,
    PaginatorComponent
  ]
})
export class TableDtComponent {
  // TODO
  //1º fase -> columns [DONE]
  //2º fase -> rows [DONE]
  //3º fase -> bootstrap table styles [DONE]
  //4º fase -> staticDataSource [DONE]
  //5º fase -> remoteDataSource
  //6º fase -> pagination [Almost DONE //TODO falta os botões de avançar e retroceder pagia]
  //7º fase -> search [Almost DONE] //TODO search small css e filtrar tendo em consideração o page size.
  //8º fase -> actions column
  //9º fase -> select row
  //10ª fase -> row action

  readonly dataSource = input.required<DataSource>();
  readonly search = input(false);

  readonly columns = contentChildren(DataTableCol, {
    descendants: true,
  });

  readonly rows = derivedAsync(() => this.dataSource().data$, { initialValue: [] });

  async onSearch(search: string, rowLimit?: number) {
    await this.dataSource().filter(search, rowLimit);
  }
}
