import {StaticDataSource} from "./util-datasource/static-data-source";
import RemoteDataSource from "./util-datasource/remote-data-source";

export type TRow = {id?: number} & Record<string, unknown>;

export type DataSource = StaticDataSource<TRow> | RemoteDataSource<any>;
