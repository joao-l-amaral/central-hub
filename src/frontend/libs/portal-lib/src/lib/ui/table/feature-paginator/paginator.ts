import {ChangeDetectionStrategy, Component, effect, input, OnInit, signal} from "@angular/core";
import {DataSource} from "../data-table.types";
import {InternalizationPipe} from "@central-hub/library";
import {form, FormField} from "@angular/forms/signals";

interface PaginatorData {
  paginatorPageSize: number;
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
export class PaginatorComponent implements OnInit {
  readonly dataSource = input.required<DataSource>();
  readonly pageSize = input.required<number[]>();
  readonly pageSizeSelector = input.required<number>();

  readonly paginatorModel= signal<PaginatorData>({
    paginatorPageSize: 0
  })

  readonly paginatorForm = form(this.paginatorModel);

  constructor() {

    effect(() => {
      const size = this.paginatorForm.paginatorPageSize().value();
      this.dataSource().setPageSize(size);
    });
  }

  ngOnInit(): void {
    this.paginatorModel.set({
      paginatorPageSize: this.pageSizeSelector()
    })
  }

  protected onPageSizeChange(pageSizeEvent: Event): void {
    const rawValue = (pageSizeEvent.target as HTMLSelectElement).value;
    const size = Number(rawValue);
    this.paginatorForm.paginatorPageSize().value.set(size);
  }

  protected prevPage() {
    this.dataSource().decreasePageNumber();
  }

  protected nextPage() {
    this.dataSource().increasePageNumber();
  }
}
