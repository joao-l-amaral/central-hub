import { Directive, inject, TemplateRef } from '@angular/core';
import { DataTableCellContext } from './data-table-cell-context';

@Directive({
  selector: '[dtTemplate]',
  standalone: true,
})
export class DtTemplateDirective<
  TRow extends Record<string, unknown> = Record<string, unknown>,
  TValue = unknown,
> {
  readonly template = inject(
    TemplateRef<DataTableCellContext<TRow, TValue>>,
  );
}
