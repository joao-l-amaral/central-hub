import {ChangeDetectionStrategy, Component, contentChild, input,} from '@angular/core';
import {DtCellTemplateDirective} from "../../util-data-table-commons/data-table-cell-template-directive";

@Component({
  selector: 'lib-dt-col',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableCell<TRow extends Record<string, unknown>> {
  readonly header = input.required<string>();
  readonly key = input.required<keyof TRow & string>();

  readonly cellTemplate = contentChild(DtCellTemplateDirective<TRow, TRow[keyof TRow & string]>);
}
