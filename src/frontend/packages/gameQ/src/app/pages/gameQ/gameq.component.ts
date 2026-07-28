import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal,} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {AdministrationComponent} from '../administration/administration.component';
import {Subscription} from 'rxjs';
import {
  DataTableCell,
  DtCellTemplateDirective,
  InternalizationPipe,
  PaginationPage,
  RemoteDataSource,
  RequestFactory,
  TableDtComponent
} from '@central-hub/library';

interface DummyResponse {
  name: string,
  age: number,
  role: string,
  function: string
}

@Component({
  selector: 'gameq-vault-home',
  templateUrl: './gameq.component.html',
  styleUrl: './gameq.component.scss',
  imports: [
    MatSlideToggle,
    ReactiveFormsModule,
    AdministrationComponent,
    InternalizationPipe,
    TableDtComponent,
    DataTableCell,
    DtCellTemplateDirective
  ],
  providers: [
    RequestFactory
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameQComponent implements OnDestroy {
  readonly slideForm = new FormControl(false);

  readonly isAdministrator = signal(false);
  readonly #adminstratorSub: Subscription;

  readonly #requestFactory = inject(RequestFactory);

  constructor() {
    this.#adminstratorSub = this.slideForm.valueChanges.subscribe((changes) => {
      if (changes !== null) {
        this.isAdministrator.set(changes);
      }
    });
  }

  ngOnDestroy(): void {
    this.#adminstratorSub.unsubscribe();
  }

  readonly #requestSubject$ = (search: string, page: number, pageSize: number) =>
    this.#requestFactory.get<PaginationPage<DummyResponse>>('/api/games/test', { params: { search, page, pageSize } });

  readonly #removeRequestSubject$ = (data: DummyResponse[]) =>
    this.#requestFactory.post<DummyResponse>('/api/games/test', { body: data });


  readonly dataSource = new RemoteDataSource<DummyResponse>(
    this.#requestSubject$,
    this.#removeRequestSubject$
  );

  protected onSearch($event: string) {
    console.log($event);
  }
}
