import {BehaviorSubject, finalize, Observable} from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { signal } from '@angular/core';
import {ChRemoteDataSourceOptions, ChTableParams} from "./data-source.types";

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

export class RemoteDataSource<T> extends DataSource<T> {

  readonly #data = new BehaviorSubject<T[]>([]);
  readonly loading = signal(false);
  readonly total = signal(0);

  constructor(readonly options: ChRemoteDataSourceOptions<T>) { super(); }

  load(params: ChTableParams): void {
    this.loading.set(true);
    this.options.fetch(params).pipe(
      finalize(() => this.loading.set(false))
    ).subscribe(result => {
      this.#data.next(result.data);
      this.total.set(result.total);
    });
  }

  getData(): T[] {
    return this.#data.getValue();
  }

  connect(): Observable<T[]> {
    return this.#data.asObservable();
  }

  disconnect(): void {
    this.#data.complete();
  }
}
