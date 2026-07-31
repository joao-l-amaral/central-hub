import {ChangeDetectionStrategy, Component, computed, contentChildren, input, output, signal} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCell} from "./feature-data-table-cell/ui-cell/data-table-cell";
import {ActionCell} from "./feature-data-table-cell/ui-action/action-cell";
import {TableDtHeaderComponent} from "./feature-data-table-cell/ui-header/header";
import {DataSource, TRow} from './data-table.types';
import {derivedAsync} from "ngxtension/derived-async";
import {PaginatorComponent} from "./feature-paginator/paginator";
import {DtRowSelectionDirective} from "./util-row-selector/row-directive";
import {StopPropagationDirective} from "./util-data-table-commons/data-table-stop-progrataion-directive";
import {SearchInputComponent} from "../search-input";
import {ButtonComponent} from "../button/button";
import {InternalizationPipe} from "../../util-i18n/i18n.pipe";
import {LoadingBlockComponent} from "../loading-block";
import {SortCriterion} from "./util-request";

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
    InternalizationPipe,
    LoadingBlockComponent
  ]
})
export class TableDtComponent {
  // TODO
  //1º fase -> columns [DONE]
  //2º fase -> rows [DONE]
  //3º fase -> bootstrap table styles [DONE]
  //4º fase -> staticDataSource [DONE]
  //5º fase -> remoteDataSource [DONE]
  //6º fase -> pagination [DONE]
  //7º fase -> search [DONE]
  //8º fase -> select row [DONE]
  //9º fase -> actions column [DONE]
  //10ª fase -> row action [DONE]
  //11ª fase -> select boxes (mass deletions) [DONE]
  //12ª fase -> adicionar remove items no remoteDataSource [DONE]
  //13ª fase -> adicionar loading no remoteDataSource [DONE]
  //14º fase -> adicionar toastr notification [DONE]
  //14ª fase -> implement order in remote and static [DONE]
  //15ª fase -> Set a empty data row if no data is present [DONE]
  //16ª fase -> fix remote datasource data id [DONE]
  //17º fase -> check lint
  //18º fase -> check test

  readonly dataSource = input.required<DataSource>();
  readonly search = input(false);
  readonly removeRecords = input(false)
  readonly pageSize = input(5);

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

  readonly selectedRowsToRemove = signal<TRow[]>([]);

  readonly haveSelectedRowsToRemote = computed(() => this.selectedRowsToRemove().length > 0);

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
    const rowsToRemove = this.selectedRowsToRemove();
    if (rowsToRemove.length === 0) return;

    this.dataSource().removeRecords(rowsToRemove);
    this.selectedRowsToRemove.set([]);
  }

  selectRowToRemove(row: TRow) {
    this.selectedRowsToRemove.update((rows) => {
      const exists = rows.some((r) => r.id === row.id);
      return exists
        ? rows.filter((r) => r !== row)
        : [...rows, row];
    });
  }

  protected isRowChecked(row: TRow) {
    return this.selectedRowsToRemove().some(selected => selected.id === row.id);
  }

  protected selectAllVisibleRows() {
    const allSelected = this.selectedRowsToRemove().length === this.rows().length;
    this.selectedRowsToRemove.set([]);
    if (!allSelected) {
      this.selectedRowsToRemove.set([...this.rows()]);
    }
  }

  protected isAllVisibleRowsChecked() {
    return this.selectedRowsToRemove().length === this.rows().length && this.rows().length > 0;
  }

  protected onSortColumnChanged($event: SortCriterion) {
    this.dataSource().setSort($event);
  }
}
