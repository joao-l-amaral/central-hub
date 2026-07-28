import {combineLatest, debounceTime, filter, finalize, firstValueFrom, Observable, switchMap, tap} from 'rxjs';
import {inject, signal} from '@angular/core';
import {CHDataSource} from "./data-source";
import {PaginationPage} from '../util-request/request-factory.types';
import {ToastrService} from "ngx-toastr";

class RemoteDataSource<T> extends CHDataSource<T> {
  readonly #toastr = inject(ToastrService);

  readonly total = signal(0);
  readonly pageSize = signal(0);
  readonly page = signal(0);

  constructor(
    private readonly requestFn: (search: string, page: number, pageSize: number) => Observable<PaginationPage<T>>,
    private readonly deleteRequestFn?: (data: T[]) => Observable<T>
  ) {
    super();

    combineLatest([
      this.search.pipe(debounceTime(300)),
      this.pageSizeSub,
      this.pageSub
    ]).pipe(
      filter(([_search, pageSize]) => pageSize !== 0),
      tap(() => this.loading = true),
      switchMap(([search, pageSize, page]) => {
        return this.requestFn(search, page, pageSize).pipe(
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

  removeRecords(data: T[]): void {
    if (this.deleteRequestFn) {
      firstValueFrom(this.deleteRequestFn(data)).then(r => {
        this.#toastr.success("Remote data removed successfully.");
      }).catch(err => {
        this.#toastr.error("Failed to remove remote data.", err.message);
      });
    }
  }

  connect(): Observable<T[]> {
    return this.data.asObservable();
  }

  disconnect(): void {
    this.data.complete();
    this.pageSizeSub.complete();
    this.pageSub.complete();
  }
}

export default RemoteDataSource
