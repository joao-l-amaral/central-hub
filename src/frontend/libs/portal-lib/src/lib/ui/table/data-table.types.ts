/* import {TemplateRef} from "@angular/core";

export interface ChColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  cell: (row: T) => string | number | TemplateRef<any>;
}
export interface ChTablePaginator {
  page: number;
  pageSize: number;
  pageSizeOptions?: number[];  //  [10, 25, 50]
  total: number;
} */

import {StaticDataSource} from "./util-datasource/static-data-source";
import {RemoteDataSource} from "./util-datasource/remote-data-source";

export type TRow = Record<string, unknown>;

export type DataSource = StaticDataSource<TRow> | RemoteDataSource<TRow>;
