import { Directive, inject, TemplateRef } from '@angular/core';
import { DataTableCellContext } from './data-table-contexts.types';

@Directive({
  selector: '[dtTemplate]',
  standalone: true,
})
export class DtCellTemplateDirective<
    TRow = Record<string, unknown>,
    TValue = unknown,
> {
  readonly template = inject(TemplateRef<DataTableCellContext<TRow, TRow[keyof TRow & string]>>);
}
