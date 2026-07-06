import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export class StaticDataSource<T> extends DataSource<T> {
  readonly #data = new BehaviorSubject<T[]>([]);

  constructor(initialData: T[] = []) {
    super();
    this.#data.next(initialData);
  }

  setData(data: T[]): void {
    this.#data.next(data);
  }

  connect(): Observable<T[]> {
    return this.#data.asObservable();
  }

  disconnect(): void {
    this.#data.complete();
  }
}
