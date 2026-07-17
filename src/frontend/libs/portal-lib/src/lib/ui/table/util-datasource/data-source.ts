import {Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";

export abstract class CHDataSource<T> extends DataSource<T> {
  abstract readonly data$: Observable<T[]>;

  abstract setSearch(searchInput: string): void;
  abstract setPageSize(pageSize: number): void;
  abstract increasePageNumber(): void;
  abstract decreasePageNumber(): void;
  abstract removeRecords(data: T[]): void;

  protected abstract applyFiltersAndPagination(data: T[], search: string, pageSize: number, page: number): Observable<T[]>;
  protected abstract matchesSearch(item: T, searchTerm: string): boolean;
}
