import {ChangeDetectionStrategy, Component, contentChildren, effect, input,} from '@angular/core';
import {DtCellTemplateDirective} from "../util-data-table-commons/data-table-cell-template-directive";

@Component({
  selector: 'lib-dt-action-col',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableActionCell<TRow extends Record<string, unknown>> {
  readonly header = input.required<string>();
  readonly cellTemplate = contentChildren(DtCellTemplateDirective<TRow, TRow[keyof TRow & string]>);

  constructor() {
    effect(() => {
      console.log(this.cellTemplate());
    })
  }
}
