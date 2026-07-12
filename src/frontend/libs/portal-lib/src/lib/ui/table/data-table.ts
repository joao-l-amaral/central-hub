import {ChangeDetectionStrategy, Component, contentChildren, input, output, signal} from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {DataTableCol} from "./feature-data-table-cell/data-table-cell";
import {TableDtHeaderComponent} from "./feature-data-table-cell/header/header";
import {DataSource} from './data-table.types';
import {derivedAsync} from "ngxtension/derived-async";
import {SearchInputComponent} from "@central-hub/library";
import {PaginatorComponent} from "./feature-paginator/paginator";
import {DtRowSelectionDirective} from "./util-row-selector/row-directive";

type TRow = Record<string, unknown>;

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
    DtRowSelectionDirective
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
  //9º fase -> actions column
  //10ª fase -> row action
  //11ª fase -> select boxes
  //12ª fase -> adicionar loading no remoteDataSource

  readonly dataSource = input.required<DataSource>();
  readonly search = input(false);

  readonly rowSelected = signal<TRow>({});

  readonly rowClicked = output<TRow>();

  readonly columns = contentChildren(DataTableCol, {
    descendants: true,
  });

  readonly rows = derivedAsync(() => this.dataSource().data$, { initialValue: [] });

  onSearch(search: string) {
    this.dataSource().setSearch(search);
  }

  protected rowClickedFn($event: TRow) {
    if (this.rowSelected() === $event) {
      this.rowSelected.set({});
      this.rowClicked.emit({});
    } else {
      this.rowSelected.set($event);
      this.rowClicked.emit($event);
    }
  }
}
