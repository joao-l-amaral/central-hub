import {BehaviorSubject, combineLatest, debounceTime, Observable, of, switchMap} from 'rxjs';
import {CHDataSource} from "./data-source";

export class StaticDataSource<T> extends CHDataSource<T> {
  readonly #originalData = new BehaviorSubject<T[]>([]);

  constructor(initialData: T[] = []) {
    super();

    const dataWithId = this.processDataIds(initialData);
    this.#originalData.next(dataWithId);
    this.setData(initialData);

    combineLatest([
      this.search.pipe(debounceTime(300)),
      this.pageSizeSub,
      this.pageSub,
      this.#originalData
    ]).pipe(
      switchMap(([search, pageSize, page, data]) => this.#applyFiltersAndPagination(data, search, pageSize, page))
    ).subscribe(filteredData => {
      this.data.next(filteredData);
    });
  }

  #applyFiltersAndPagination(data: T[], search: string, pageSize: number, page: number) {
    let filtered = data;

    if (search.trim()) {
      const searchLower = search.trim().toLowerCase();
      filtered = data.filter(item => this.matchesSearch(item, searchLower));
    }

    if (pageSize > 0 && pageSize < filtered.length) {
      const startIndex = (page - 1) * pageSize;
      filtered = filtered.slice(startIndex, startIndex + pageSize);
    }

    return of(filtered);
  }

  matchesSearch(item: T, searchTerm: string) {
    return JSON.stringify(item).toLowerCase().includes(searchTerm);
  }

  setSearch(searchInput: string) {
    this.search.next(searchInput);
  }

  removeRecords(data: T[]): void {
    this.#originalData.next(this.#originalData.getValue().filter(item => !data.includes(item)));
    this.data.next(this.data.getValue().filter(item => !data.includes(item)));
  }

  connect(): Observable<T[]> {
    return this.data.asObservable();
  }

  hasPreviousPage() {
    return true;
  }
  override hasNextPage() {
    return true;
  }

  disconnect(): void {
    this.data.complete();
    this.search.complete();
    this.pageSizeSub.complete();
    this.pageSub.complete();
    this.#originalData.complete();
  }
}
