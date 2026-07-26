import {BehaviorSubject} from "rxjs";
import {DataSource} from "@angular/cdk/collections";

export abstract class CHDataSource<T> extends DataSource<T> {
  protected readonly data = new BehaviorSubject<T[]>([]);
  readonly data$ = this.data.asObservable();


  readonly search = new BehaviorSubject<string>("");
  readonly pageSizeSub = new BehaviorSubject<number>(0);
  readonly pageSub = new BehaviorSubject<number>(1);

  abstract setSearch(searchInput: string): void;
  abstract removeRecords(data: T[]): void;
  abstract hasPreviousPage(): boolean;
  abstract hasNextPage(): boolean;

  setPageSize(pageSizeSub: number) {
    this.pageSizeSub.next(Math.trunc(pageSizeSub));
  }

  increasePageNumber() {
    const nextPage = this.pageSub.getValue() + 1
    this.pageSub.next(Math.trunc(nextPage));
  }

  decreasePageNumber() {
    const prevPage = this.pageSub.getValue() - 1
    if( prevPage > 0 ) {
      this.pageSub.next(prevPage);
    }
  }

  protected setData(data: T[]): void {
    this.data.next(this.processDataIds(data));
  }

  protected processDataIds(initialData: T[]) {
    return initialData.map((item, index) =>
      (item as Record<string, any>)['id'] ? item : {...item, id: index}
    );
  }
}
