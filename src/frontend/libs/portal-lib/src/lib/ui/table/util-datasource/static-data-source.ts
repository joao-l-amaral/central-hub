import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, debounceTime, Observable, of, switchMap} from 'rxjs';

//TODO estes metodos deviam estar num abstract

export class StaticDataSource<T> extends DataSource<T> {
  readonly #originalData = new BehaviorSubject<T[]>([]);
  readonly #data = new BehaviorSubject<T[]>([]);
  readonly #search = new BehaviorSubject<string>("");
  readonly #pageSize = new BehaviorSubject<number>(0);
  readonly #page = new BehaviorSubject<number>(1);

  data$ = this.#data.asObservable();

  constructor(initialData: T[] = []) {
    super();
    this.#originalData.next(initialData);
    this.#data.next(initialData);

    combineLatest([
      this.#search.pipe(debounceTime(300)),
      this.#pageSize,
      this.#page,
    ]).pipe(
      switchMap(([search, pageSize, page]) => this.#applyFiltersAndPagination(search, pageSize, page))
    ).subscribe(filteredData => {
      this.#data.next(filteredData);
    });
  }

  #applyFiltersAndPagination(search: string, pageSize: number, page: number): Observable<T[]> {
    const data = this.#originalData.getValue();

    let filtered = data;
    if (search.trim()) {
      const searchLower = search.trim().toLowerCase();
      filtered = data.filter(item => this.#matchesSearch(item, searchLower));
    }

    if (pageSize > 0 && pageSize < filtered.length) {
      const startIndex = (page - 1) * pageSize;
      filtered = filtered.slice(startIndex, startIndex + pageSize);
    }

    return of(filtered);
  }

  #matchesSearch(item: T, searchTerm: string): boolean {
    return JSON.stringify(item).toLowerCase().includes(searchTerm);
  }

  setSearch(searchInput: string) {
    this.#search.next(searchInput);
  }

  setPageSize(pageSize: number) {
    this.#pageSize.next(Math.trunc(pageSize));
  }

  increasePageNumber() {
    const nextPage = this.#page.getValue() + 1
    this.#page.next(Math.trunc(nextPage));
  }

  decreasePageNumber() {
    const prevPage = this.#page.getValue() - 1
    if( prevPage > 0 ) {
      this.#page.next(prevPage);
    }
  }

  connect(): Observable<T[]> {
    return this.#data.asObservable();
  }

  disconnect(): void {
    this.#data.complete();
    this.#search.complete();
    this.#pageSize.complete();
    this.#page.complete();
    this.#originalData.complete();
  }
}
