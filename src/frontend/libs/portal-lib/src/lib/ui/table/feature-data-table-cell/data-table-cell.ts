import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
} from '@angular/core';
import { DtTemplateDirective } from '../util-data-table-commons/data-table-template-directive';

@Component({
  selector: 'lib-dt-col',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DtTemplateDirective],
})
export class DataTableCell<TRow extends Record<string, unknown>> {
  readonly header = input.required<string>();
  readonly key = input.required<keyof TRow & string>();

  readonly cellTemplate = contentChild(DtTemplateDirective<TRow>);
}
