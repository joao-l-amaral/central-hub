import {ChangeDetectionStrategy, Component, contentChildren, input} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCell} from "./feature-data-table-cell/data-table-cell";

@Component({
  selector: 'lib-table-dt',
  templateUrl: 'data-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
  ]
})
export class TableDtComponent<RECORD> {
  // TODO
  //1º fase -> columns [DONE]
  //2º fase -> rows  [DONE]
  //3º fase -> staticDataSource
  //4º fase -> remoteDataSource
  //5º fase -> pagination
  //6º fase -> search
  //7º fase -> actions column

  readonly rows = input.required<readonly TRow[]>();

  readonly columns = contentChildren(DataTableCell, {
    descendants: true,
  });

}
