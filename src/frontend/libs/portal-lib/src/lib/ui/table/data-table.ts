import {ChangeDetectionStrategy, Component, contentChildren, input} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCol} from "./feature-data-table-cell/data-table-cell";
import {TableDtHeaderComponent} from "./feature-data-table-cell/header/header";
import {StaticDataSource} from "./util-datasource/static-data-source";
import {RemoteDataSource} from "./util-datasource/remote-data-source";
import {TRow} from './data-table.types';
import {derivedAsync} from "ngxtension/derived-async";
import {SearchInputComponent} from "@central-hub/library";

@Component({
  selector: 'lib-table-dt',
  templateUrl: 'data-table.html',
  styleUrl: 'data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    TableDtHeaderComponent,
    SearchInputComponent
  ]
})
export class TableDtComponent {
  // TODO
  //1º fase -> columns [DONE]
  //2º fase -> rows [DONE]
  //3º fase -> bootstrap table styles [DONE]
  //4º fase -> staticDataSource [DONE]
  //5º fase -> remoteDataSource
  //6º fase -> pagination
  //7º fase -> search [DONE] -- search smll css
  //8º fase -> actions column
  //9º fase -> select row
  //10ª fase -> row action

  readonly dataSource = input.required<StaticDataSource<TRow> | RemoteDataSource<TRow>>();
  readonly search = input(false);

  readonly columns = contentChildren(DataTableCol, {
    descendants: true,
  });

  readonly rows = derivedAsync(() => this.dataSource().data$, { initialValue: [] });

  async onSearch(search: string) {
    await this.dataSource().filter(search);
  }
}
