import {BehaviorSubject, Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";

export abstract class CHDataSource<T> extends DataSource<T> {
  protected readonly data = new BehaviorSubject<T[]>([]);
  readonly data$ = this.data.asObservable();

  abstract setSearch(searchInput: string): void;
  abstract setPageSize(pageSize: number): void;
  abstract increasePageNumber(): void;
  abstract decreasePageNumber(): void;
  abstract removeRecords(data: T[]): void;

  protected abstract applyFiltersAndPagination(data: T[], search: string, pageSize: number, page: number): Observable<T[]>;
  protected abstract matchesSearch(item: T, searchTerm: string): boolean;

  protected setData(data: T[]): void {
    this.data.next(this.processDataIds(data));
  }

  protected processDataIds(initialData: T[]) {
    return initialData.map((item, index) =>
      (item as Record<string, any>)['id'] ? item : {...item, id: index}
    );
  }
}
