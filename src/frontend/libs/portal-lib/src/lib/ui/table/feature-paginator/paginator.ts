import {ChangeDetectionStrategy, Component, computed, effect, inject, input, OnInit, signal} from "@angular/core";
import {DataSource} from "../data-table.types";
import {I18nService, InternalizationPipe} from "@central-hub/library";
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

  readonly #i18n = inject(I18nService);

  readonly paginatorModel= signal<PaginatorData>({
    paginatorPageSize: 0
  })

  readonly totalRecords = computed(() => {
    return this.dataSource().getTotalRecords();
  });

  readonly paginatorForm = form(this.paginatorModel);

  centralLabel = "";

  constructor() {

    effect(() => {
      const pageSize = String(this.paginatorModel().paginatorPageSize);
      const total = String(this.totalRecords());
      // TODO testar isto e adicioanr a label claro. A mostrar 1-%s de %s
      this.centralLabel = this.#i18n.translate('table-dt-total', `${pageSize} ${total}`);
    });

    effect(() => {
      const size = this.paginatorForm.paginatorPageSize().value();
      this.dataSource().spliceData(size);
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
}
