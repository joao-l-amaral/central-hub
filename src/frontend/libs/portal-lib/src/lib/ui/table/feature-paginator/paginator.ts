import {ChangeDetectionStrategy, Component, computed, effect, input, signal} from "@angular/core";
import {DataSource} from "../data-table.types";
import {form, FormField} from "@angular/forms/signals";
import {InternalizationPipe} from '../../../util-i18n';

interface PaginatorData {
  paginatorPageSize: string;
}

@Component({
  selector: 'lib-table-dt-paginator',
  templateUrl: 'paginator.html',
  styleUrl: 'paginator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InternalizationPipe,
    FormField
  ]
})
export class PaginatorComponent {
  readonly dataSource = input.required<DataSource>();
  readonly pageSize = input.required<number[]>();
  readonly pageSizeSelector = input.required<number>();

  readonly paginatorModel= signal<PaginatorData>({
    paginatorPageSize: "0"
  })

  readonly paginatorForm = form(this.paginatorModel);

  readonly hasPreviousPage = computed(() => this.dataSource().hasPreviousPage());
  readonly hasNextPage = computed(() => this.dataSource().hasNextPage());

  constructor() {

    effect(() => {
      const size = this.paginatorForm.paginatorPageSize().value();
      this.dataSource().setPageSize(Number(size));
    });

    effect(() => {
      this.paginatorModel.set({
        paginatorPageSize: this.pageSizeSelector().toString(),
      });
    });
  }

  protected onPageSizeChange(pageSizeEvent: Event): void {
    const rawValue = (pageSizeEvent.target as HTMLSelectElement).value;
    this.paginatorForm.paginatorPageSize().value.set(rawValue);
  }

  protected prevPage() {
    this.dataSource().decreasePageNumber();
  }

  protected nextPage() {
    this.dataSource().increasePageNumber();
  }
}
