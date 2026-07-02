import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { ShelveProductService } from '../../data-source/shelve-product.service';
import { ShelveProduct } from '../../interface/shelve-product.interface';
import { TableService } from '../table/table.service';
import { ToastrService } from 'ngx-toastr';
import { SideNavService } from '../../services/side-nav.service';
import { StatisticsPanelService } from '../statistics-panel/statistics-panel.service';
import { ButtonComponent, InternalizationPipe } from '@central-hub/library';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sp-form-component',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    InternalizationPipe,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ButtonComponent,
  ],
  providers: [ShelveProductService, provideNativeDateAdapter(), DatePipe],
})
export class FormComponent implements OnInit, OnDestroy {
  readonly #fb = inject(FormBuilder);
  readonly #shelveProductService = inject(ShelveProductService);
  readonly #datePipe = inject(DatePipe);
  readonly #tableService = inject(TableService);
  readonly #sideNavService = inject(SideNavService);
  readonly #toastr = inject(ToastrService);
  readonly #statisticsPanelService = inject(StatisticsPanelService);

  protected today: Date = new Date();

  isEditMode = this.#sideNavService.isEditMode;

  filteredProductsByBarCode: string[] = [];
  #subscription: Subscription | undefined;

  constructor() {
    effect(() => {
      const shelveProduct = this.#sideNavService.productSelected();
      this.myForm.patchValue(shelveProduct);
    });

    effect(() => {
      if (this.isEditMode()) {
        this.myForm.controls['shelveCode'].disable();
      } else {
        this.myForm.controls['shelveCode'].enable();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.#subscription) {
      this.#subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.#subscription = this.myForm.valueChanges.subscribe((value) => {
      if (value?.barCode) {
        this.filteredProductsByBarCode = [];

        const barCode = value?.barCode;

        const shelveProducts = this.#tableService.dataSource();
        const filteredProducts = shelveProducts.filter((product) => {
          return product.barCode.startsWith(barCode);
        });

        for (const item of filteredProducts) {
          this.filteredProductsByBarCode.push(item.barCode);
        }
      }
    });
  }

  protected myForm = this.#fb.group({
    name: ['', Validators.required],
    barCode: ['', Validators.required],
    shelveCode: ['', Validators.required],
    expiryDate: ['', Validators.required],
    weight: [0, Validators.min(0)],
    calories: [0, Validators.min(0)],
  });

  protected submitForm() {
    this.myForm.markAllAsTouched();

    if (this.myForm.valid) {
      this.#tableService.isLoadingResults.set(true);

      const payload: ShelveProduct = {
        name: this.myForm.value.name ?? '',
        barCode: this.myForm.value.barCode ?? '',
        shelveCode: this.myForm.value.shelveCode ?? '',
        expiryDate:
          this.#datePipe.transform(
            this.myForm.value.expiryDate,
            'yyyy-MM-dd',
          ) ?? '',
        date: this.#datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
        weight: this.myForm.value.weight ?? 0,
        calories: this.myForm.value.calories ?? 0,
      };

      this.#shelveProductService
        .saveShelveProduct(payload)
        .then((shelveProduct: ShelveProduct) => {
          let shelveProducts = this.#tableService.dataSource();
          if (shelveProducts === null) {
            shelveProducts = [];
          }
          const updatedShelveProducts = [...shelveProducts, shelveProduct];
          this.#tableService.dataSource.set(updatedShelveProducts);
          this.#statisticsPanelService.getStatistics();
          this.#toastr.success(
            `Product "${shelveProduct.shelveCode}" was added successfully.`,
            '',
            {
              positionClass: 'toast-bottom-left',
            },
          );
          this.clearForm();
        })
        .catch((error) => {
          this.#toastr.error(error.statusText, '', {
            positionClass: 'toast-bottom-left',
          });
        })
        .finally(() => {
          this.#tableService.isLoadingResults.set(false);
        });
    }
  }

  protected clearForm() {
    this.#sideNavService.isEditMode.set(false);
    this.myForm.controls['shelveCode'].enable();
    this.myForm.reset();
  }

  protected updateProduct() {
    const shelveCode = this.myForm.getRawValue().shelveCode;

    this.#tableService.isLoadingResults.set(true);

    const payload: ShelveProduct = {
      name: this.myForm.value.name ?? '',
      barCode: this.myForm.value.barCode ?? '',
      shelveCode: shelveCode!,
      expiryDate:
        this.#datePipe.transform(this.myForm.value.expiryDate, 'yyyy-MM-dd') ??
        '',
      date: this.#datePipe.transform(new Date(), 'yyyy-MM-dd') ?? '',
      weight: this.myForm.value.weight ?? 0,
      calories: this.myForm.value.calories ?? 0,
    };

    this.#shelveProductService
      .updateProduct(shelveCode!, payload)
      .then(() => {
        this.#tableService.dataSource.set(
          this.#tableService
            .dataSource()
            .map((product) =>
              product.shelveCode === shelveCode
                ? { ...product, ...payload }
                : product,
            ),
        );
        this.#statisticsPanelService.getStatistics();
        this.#toastr.success(
          `Product "${shelveCode}" was updated successfully.`,
          '',
          {
            positionClass: 'toast-bottom-left',
          },
        );
      })
      .catch((error) => {
        this.#toastr.error(error.statusText, '', {
          positionClass: 'toast-bottom-left',
        });
      })
      .finally(() => {
        this.#tableService.isLoadingResults.set(false);
      });
  }

  onSelect($event: MatAutocompleteSelectedEvent) {
    const selectedValue = $event.option.value;

    const shelveProducts = this.#tableService.dataSource();

    const product = shelveProducts.filter(
      (product) => product.barCode === selectedValue,
    )[0];

    this.myForm.patchValue({
      barCode: product.barCode,
      name: product.name,
      calories: product.calories,
    });
  }
}
