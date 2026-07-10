import { DataSource } from '@angular/cdk/collections';
import {BehaviorSubject, debounceTime, firstValueFrom, Observable} from 'rxjs';
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
      debounceTime(300),
      map((items: T[]) =>
        items.filter((item) => JSON.stringify(item).toLowerCase().includes(search))
      )
    ));

    this.#data.next(filtered);
  }

  spliceData(spliceBy: number) {
    const data = this.#originalData.getValue();

    const count = Math.trunc(spliceBy);

    if (count === -1 || count >= data.length) {
      this.#data.next(this.#originalData.getValue());
    } else {
      this.#data.next(data.slice(0, count));
    }
  }

  getTotalRecords() {
    return this.#originalData.getValue().length;
  }

  connect(): Observable<T[]> {
    return this.#data.asObservable();
  }

  disconnect(): void {
    this.#data.complete();
  }
}
