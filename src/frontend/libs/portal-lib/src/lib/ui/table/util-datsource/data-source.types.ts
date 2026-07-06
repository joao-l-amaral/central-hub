import {Observable} from "rxjs";

export interface ChRemoteDataSourceOptions<T> {
  fetch: (params: ChTableParams) => Observable<ChPagedResult<T>>;
}

export interface ChTableParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  filter?: string;
}

export interface ChPagedResult<T> {
  data: T[];
  total: number;
}

