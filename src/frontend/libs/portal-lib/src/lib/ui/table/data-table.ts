import {ChangeDetectionStrategy, Component, contentChildren, effect} from '@angular/core';
import {DataTableCol} from "./col/data-table-col";
import {NgTemplateOutlet} from "@angular/common";

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
  //2º fase -> rows
  //3º fase -> static
  //4º fase -> remote

  readonly columns = contentChildren(DataTableCol<RECORD>);

  constructor() {
    effect(()=> {
      console.log(this.columns())
    })
  }

}
