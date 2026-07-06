import {Directive, inject, TemplateRef} from "@angular/core";
import {DataTableCellContext} from "./data-table-cell-context";

@Directive({
  selector: '[dtTemplate]',
  standalone: true,
})
export class DtTemplateDirective<T = unknown> {
  readonly template = inject(TemplateRef<DataTableCellContext<T>>);
}
