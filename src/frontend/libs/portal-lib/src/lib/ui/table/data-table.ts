import {ChangeDetectionStrategy, Component, contentChildren, input, output, signal, computed} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCell} from "./feature-data-table-cell/ui-cell/data-table-cell";
import {ActionCell} from "./feature-data-table-cell/ui-action/action-cell";
import {TableDtHeaderComponent} from "./feature-data-table-cell/ui-header/header";
import {DataSource, TRow} from './data-table.types';
import {derivedAsync} from "ngxtension/derived-async";
import {ButtonComponent, InternalizationPipe, SearchInputComponent} from "@central-hub/library";
import {PaginatorComponent} from "./feature-paginator/paginator";
import {DtRowSelectionDirective} from "./util-row-selector/row-directive";
import {StopPropagationDirective} from "./util-data-table-commons/data-table-stop-progrataion-directive";

@Component({
  selector: 'lib-table-dt',
  templateUrl: 'data-table.html',
  styleUrl: 'data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    TableDtHeaderComponent,
    SearchInputComponent,
    PaginatorComponent,
    DtRowSelectionDirective,
    StopPropagationDirective,
    ButtonComponent,
    InternalizationPipe
  ]
})
export class TableDtComponent {
  // TODO
  //1º fase -> columns [DONE]
  //2º fase -> rows [DONE]
  //3º fase -> bootstrap table styles [DONE]
  //4º fase -> staticDataSource [DONE]
  //5º fase -> remoteDataSource
  //6º fase -> pagination [DONE]
  //7º fase -> search [DONE]
  //8º fase -> select row [DONE]
   // TODO IT IS BETTER TO FIX LINT ERRORS
  //9º fase -> actions column [DONE]
  //10ª fase -> row action [DONE]
  //11ª fase -> select boxes (mass deletions) [DONE]
  //12ª fase -> adicionar loading no remoteDataSource

  readonly dataSource = input.required<DataSource>();
  readonly search = input(false);
  readonly removeRecords = input(false)

  readonly rowSelected = signal<TRow>({});

  readonly rowClicked = output<TRow>();

  readonly dataColumns = contentChildren(DataTableCell, {
    descendants: true,
  });

  readonly actionColumns = contentChildren(ActionCell, {
    descendants: true,
  });

  readonly columns = computed(() => [...this.dataColumns(), ...this.actionColumns()]);

  readonly rows = derivedAsync(() => this.dataSource().data$, { initialValue: [] });

  readonly #selectedRowsToRemove: TRow[] = [];

  onSearch(search: string) {
    this.dataSource().setSearch(search);
  }

  protected rowClickedFn($event: TRow) {
    if (this.rowSelected().id === $event.id) {
      this.rowSelected.set({});
      this.rowClicked.emit({});
    } else {
      this.rowSelected.set($event);
      this.rowClicked.emit($event);
    }
  }

  onRemoveRecords() {
    this.dataSource().removeRecords(this.#selectedRowsToRemove);
    this.selectAllVisibleRows();
  }

  selectRowToRemove(row: TRow) {
    this.#selectedRowsToRemove.push(row);
  }

  protected isRowChecked(row: TRow) {
    return this.#selectedRowsToRemove.includes(row);
  }

  protected selectAllVisibleRows() {
    const allSelected = this.#selectedRowsToRemove.length === this.rows().length;
    this.#selectedRowsToRemove.splice(0, this.#selectedRowsToRemove.length);
    if (!allSelected) {
      this.#selectedRowsToRemove.push(...this.rows());
    }
  }

  protected isAllVisibleRowsChecked() {
    return this.#selectedRowsToRemove.length === this.rows().length && this.rows().length > 0;
  }
}
