import {ChangeDetectionStrategy, Component, computed, contentChildren, input} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCol} from "./feature-data-table-cell/data-table-cell";
import {TableDtHeaderComponent} from "./feature-data-table-cell/header/header";
import {StaticDataSource} from "./util-datasource/static-data-source";
import {RemoteDataSource} from "./util-datasource/remote-data-source";
import {TRow} from './data-table.types';

@Component({
  selector: 'lib-table-dt',
  templateUrl: 'data-table.html',
  styleUrl: 'data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    TableDtHeaderComponent
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
  //7º fase -> search
  //8º fase -> actions column
  //9º fase -> select row
  //10ª fase -> row action

  readonly dataSource = input.required<StaticDataSource<TRow> | RemoteDataSource<TRow>>();

  readonly columns = contentChildren(DataTableCol, {
    descendants: true,
  });

  readonly rows = computed(() => {
    return this.dataSource().getData();
  });
}
