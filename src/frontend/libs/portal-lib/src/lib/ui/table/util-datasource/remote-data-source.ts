import {combineLatest, debounceTime, filter, finalize, firstValueFrom, Observable, switchMap, tap} from 'rxjs';
import {inject, signal} from '@angular/core';
import {CHDataSource} from "./data-source";
import {PaginationPage, SortCriterion} from '../util-request/request-factory.types';
import {ToastrService} from "ngx-toastr";

class RemoteDataSource<T> extends CHDataSource<T> {
  readonly #toastr = inject(ToastrService);

  readonly total = signal(0);
  readonly pageSize = signal(0);
  readonly page = signal(0);

  constructor(
    private readonly requestFn: (search: string, page: number, pageSize: number, sortOrder: string) => Observable<PaginationPage<T>>,
    private readonly deleteRequestFn?: (data: T[]) => Observable<T>
  ) {
    super();

    combineLatest([
      this.search.pipe(debounceTime(300)),
      this.pageSizeSub,
      this.pageSub,
      this.sortOrder
    ]).pipe(
      filter(([_search, pageSize]) => pageSize !== 0),
      tap(() => this.loading = true),
      switchMap(([search, pageSize, page, sortOrder]) => {
        return this.requestFn(search, page, pageSize, sortOrder as string).pipe(
          finalize(() => this.loading = false)
        )
      })
    ).subscribe(result => {
      this.setData(result.items);
      this.pageSize.set(result.pageSize);
      this.page.set(result.page);
      this.total.set(result.totalCount);
    });
  }

  hasPreviousPage(): boolean {
    return this.page() <= 1;
  }

  hasNextPage(): boolean {
    return this.page() * this.pageSize() >= this.total();
  }

  setSearch(searchInput: string) {
    this.search.next(searchInput);
  }

  setSort(sortCriterion: SortCriterion) {

    const flattened = (sortCriterion.direction === null) ? '' : Object.entries(sortCriterion)
      .map(([key, value]) => `${key}:${value}`)
      .join(',');

    this.sortOrder.next(flattened);
  }

  removeRecords(data: T[]) {
    if (this.deleteRequestFn) {
      firstValueFrom(this.deleteRequestFn(data)).then(() => {
        this.#toastr.success("Remote data removed successfully.");
      }).catch(err => {
        this.#toastr.error("Failed to remove remote data.", err.message);
      });
    }
  }

  connect(): Observable<T[]> {
    return this.data.asObservable();
  }

  disconnect() {
    this.data.complete();
    this.pageSizeSub.complete();
    this.pageSub.complete();
  }
}

export default RemoteDataSource
