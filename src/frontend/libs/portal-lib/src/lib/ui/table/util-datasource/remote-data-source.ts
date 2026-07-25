import {BehaviorSubject, finalize, Observable} from 'rxjs';
import {signal} from '@angular/core';
import {CHDataSource} from "./data-source";
import {PaginationPage} from '../util-request/request-factory.types';

/*
  private requestSubject = new BehaviorSubject(
    this.odataRequestFactory.post<PaginationPage<DiagnosticMessage>>(
      Route.APPLICATION_GET_HISTORIC_OPERATIONS_TABLE,
      { identifiers: Array.from(this.identifiers).join(',') }
    )
  );
  dataSource = new RemoteDataSource(this.requestSubject.asObservable());
 */

// TODO Finnish this.

export class RemoteDataSource<T> extends CHDataSource<T> {
  readonly loading = signal(false);
  readonly total = signal(0);

  constructor(readonly request: Observable<PaginationPage<T>>) {
    super();

    this.#load(this.request);
  }

  #load(request: Observable<PaginationPage<T>>): void {
    this.loading.set(true);
    request.pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(result => {
      this.setData(result.items);
      this.total.set(result.totalCount);
    });
  }

  applyFiltersAndPagination(data: T[], search: string, pageSize: number, page: number): Observable<T[]> {
    throw new Error("Method not implemented.");
  }

  matchesSearch(item: T, searchTerm: string) {
    return false;
    //TO BE IMPLEMENTED
  }

  setSearch(searchInput: string) {
    //TO BE IMPLEMENTED
  }

  setPageSize(pageSize: number) {
    //TO BE IMPLEMENTED
  }

  increasePageNumber() {
    //TO BE IMPLEMENTED
  }

  decreasePageNumber() {
    //TO BE IMPLEMENTED
  }

  override removeRecords(data: T[]): void {
    //TO BE IMPLEMENTED
  }

  connect(): Observable<T[]> {
    return this.data.asObservable();
  }

  disconnect(): void {
    this.data.complete();
  }
}
