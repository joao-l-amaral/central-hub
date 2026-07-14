import {ChangeDetectionStrategy, Component, contentChildren, input,} from '@angular/core';
import {DtCellTemplateDirective} from "../../util-data-table-commons/data-table-cell-template-directive";

@Component({
  selector: 'lib-dt-action-col',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ActionCell<TRow extends Record<string, unknown>> {
  readonly header = input.required<string>();
  readonly key = input.required<keyof TRow & string>();
  readonly actions = contentChildren(DtCellTemplateDirective<TRow, TRow[keyof TRow & string]>, {
    descendants: true,
  });
}
