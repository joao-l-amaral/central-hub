import { Directive, inject, TemplateRef } from '@angular/core';
import { DataTableCellContext } from './data-table-contexts.types';

@Directive({
  selector: '[libDtTemplate]',
  standalone: true,
})
export class DtCellTemplateDirective<
    TRow = Record<string, unknown>,
    _TValue = unknown,
> {
  readonly template = inject(TemplateRef<DataTableCellContext<TRow, TRow[keyof TRow & string]>>);
}
