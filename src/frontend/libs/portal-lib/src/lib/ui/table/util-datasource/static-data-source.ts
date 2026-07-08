import { DataSource } from '@angular/cdk/collections';
import {BehaviorSubject, firstValueFrom, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

export class StaticDataSource<T> extends DataSource<T> {
  readonly #originalData = new BehaviorSubject<T[]>([]);
  readonly #data = new BehaviorSubject<T[]>([]);
  data$ = this.#data.asObservable();

  constructor(initialData: T[] = []) {
    super();
    this.#originalData.next(initialData);
    this.#data.next(initialData);
  }

  async filter(searchInput?: string) {
    this.#data.next(this.#originalData.getValue());

    if (!searchInput) return;

    const search = searchInput.trim().toLowerCase();

    const filtered = await firstValueFrom(this.data$.pipe(
      map((items: T[]) =>
        items.filter((item) => JSON.stringify(item).toLowerCase().includes(search))
      )
    ));

    this.#data.next(filtered);
  }

  connect(): Observable<T[]> {
    return this.#data.asObservable();
  }

  disconnect(): void {
    this.#data.complete();
  }
}
