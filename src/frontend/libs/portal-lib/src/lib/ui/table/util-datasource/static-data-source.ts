import {BehaviorSubject, combineLatest, debounceTime, Observable, of, switchMap} from 'rxjs';
import {CHDataSource} from "./data-source";
import { SortCriterion } from "../util-request";

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
      this.#originalData,
      this.sortOrder
    ]).pipe(
      switchMap(([search, pageSize, page, data, sortCriterion]) => this.#applyFiltersAndPagination(data, search, pageSize, page, sortCriterion as SortCriterion))
    ).subscribe(filteredData => {
      this.data.next(filteredData);
    });
  }

  #applyFiltersAndPagination(data: T[], search: string, pageSize: number, page: number, sortCriterion: SortCriterion) {
    let filtered = data;

    if (search.trim()) {
      const searchLower = search.trim().toLowerCase();
      filtered = data.filter(item => this.matchesSearch(item, searchLower));
    }

    filtered = this.#applySort(filtered, sortCriterion);

    console.log(filtered);

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

  setSort(sortCriterion: SortCriterion) {
    this.sortOrder.next(sortCriterion);
  }

  #applySort(data: T[], sortCriterion: SortCriterion | null): T[] {
    if (!sortCriterion) return data;

    const { field, direction } = sortCriterion;
    const multiplier = direction === 'DESC' ? -1 : 1;

    return [...data].sort((a, b) => {
      const valueA = (a as Record<string, unknown>)[field.toLowerCase()];
      const valueB = (b as Record<string, unknown>)[field.toLowerCase()];

      return this.#compareValues(valueA, valueB) * multiplier;
    });
  }

  #compareValues(a: unknown, b: unknown): number {
    if (a === b) return 0;
    if (a === null || a === undefined) return -1;
    if (b === null || b === undefined) return 1;

    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }

    return String(a).localeCompare(String(b));
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
  hasNextPage() {
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
