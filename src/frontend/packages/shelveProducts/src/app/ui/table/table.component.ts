import { ChangeDetectionStrategy, Component, computed, HostListener, inject, signal } from '@angular/core';
import { ShelveProductService } from '../../data-source/shelve-product.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { TableService } from './table.service';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { SideNavService } from '../../services/side-nav.service';
import { ShelveProduct, ShelveProductTable } from '../../interface/shelve-product.interface';
import { CommonModule, NgClass } from '@angular/common';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { I18nService, InternalizationPipe, MF_FRONTEND, ConfirmationModalComponent } from '@portal-library';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { StatisticsPanelService } from '../statistics-panel/statistics-panel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'sp-table-component',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatCheckbox,
        MatCheckboxModule,
        NgClass,
        MatSortModule,
        MatInput,
        MatProgressSpinner,
        InternalizationPipe,
        MatTooltipModule,
        MatIconModule
    ],
    providers: [
        ShelveProductService
    ]
})
export class TableComponent {

    readonly #statisticsPanelService = inject(StatisticsPanelService);
    readonly #shelveProductService = inject(ShelveProductService);
    readonly #tableService = inject(TableService);
    readonly #sideNavService = inject(SideNavService);
    readonly #toastr = inject(ToastrService);
    readonly #dialog = inject(MatDialog);
    readonly #i18nService = inject(I18nService);
    readonly #mf = inject(MF_FRONTEND);

    displayedColumns: string[] = ['select', 'Name', 'BarCode', 'ShelveCode', 'Calories', 'Weight', 'InsertDate', 'ExpiryDate', 'daysLeft', 'actions'];

    @HostListener('window:resize', ['$event'])
    onResize(_event: UIEvent) {
        this.setDisplayedColumn();
    }

    private compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    private setDisplayedColumn() {
        const width = window.innerWidth;
        if (width < 768) {
            this.displayedColumns = ['select', 'ShelveCode', 'daysLeft', 'actions'];
        } else {
            this.displayedColumns = ['select', 'Name', 'BarCode', 'ShelveCode', 'Calories', 'Weight', 'InsertDate', 'ExpiryDate', 'daysLeft', 'actions'];
        }
    }

    readonly filter= signal<string>("");

    readonly dataSource = computed(()=>{

        const shelveProducts = this.#tableService.dataSource();

        if(shelveProducts === null || shelveProducts?.length === 0){
            return [];
        }

        const shelveProductsTable = shelveProducts!.map(shelveProduct =>{
            const expiryDate = shelveProduct.expiryDate;

            const shelveProductTable: ShelveProductTable =  {
                name: shelveProduct.name,
                barCode: shelveProduct.barCode,
                shelveCode: shelveProduct.shelveCode,
                expiryDate: shelveProduct.expiryDate,
                date: shelveProduct.date,
                daysLeft: this.calcForRemainingDays(expiryDate),
                calories: shelveProduct.calories,
                weight: shelveProduct.weight
            }

            return shelveProductTable;
        });

        const filter = this.filter();

        if(filter.trim().length === 0) {
            return shelveProductsTable;
        }

        return shelveProductsTable.filter(product =>
            Object.values(product).some(value =>
                String(value).toLowerCase().includes(filter)
            )
        );
    });

    selection = this.#tableService.selection

    isLoadingResults = this.#tableService.isLoadingResults;

    constructor() {
        this.setDisplayedColumn();

        this.#shelveProductService.getShelveProduct()
            .then(products => {
                this.#tableService.dataSource.set(products);
            })
            .finally(() => {
                this.#tableService.isLoadingResults.set(false);
            });
    }

    protected isAllSelected() {
        const numSelected = this.#tableService.selection().selected.length;
        const numRows = this.dataSource().length;
        return numSelected === numRows;
    }

    protected masterToggle() {
        if (this.isAllSelected()) {
            this.#tableService.selection().clear();
        } else {
            this.dataSource().forEach((row) =>
                this.#tableService.selection().select(row)
            );
        }
    }

    protected editProduct(shelveProduct: ShelveProduct) {
        this.#sideNavService.isEditMode.set(true);
        this.#sideNavService.productSelected.set(shelveProduct);

        setTimeout(()=> {
            this.#sideNavService.toggleSidenavSource.next();
        }, 0); //Microtask
    }

    protected calcForRemainingDays(expiryDate: string){
        const expiryParsedDate = new Date(expiryDate);
        const currentDate = new Date();

        const diffTime = expiryParsedDate.getTime() - currentDate.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
    }

    protected applyFilter(event: KeyboardEvent) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filter.set(filterValue.trim().toLowerCase());
    }

    protected sortData(sort: Sort) {
        const data = this.#tableService.dataSource();
        if (!sort.active || sort.direction === '') {
            return;
        }

        const sortedData = [...data].sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'Name':
                    return this.compare(a.name, b.name, isAsc);
                case 'BarCode':
                    return this.compare(a.barCode, b.barCode, isAsc);
                case 'ShelveCode':
                    return this.compare(a.shelveCode, b.shelveCode, isAsc);
                case 'Calories':
                    return this.compare(a.calories, b.calories, isAsc);
                case 'Weight':
                    return this.compare(a.weight, b.weight, isAsc);
                case 'ExpiryDate':
                    return this.compare(a.expiryDate, b.expiryDate, isAsc);
                default:
                    return 0;
            }
        });

        this.#tableService.dataSource.set(sortedData);
    }

    isActiveRow(row: ShelveProduct) {
        return this.#sideNavService.productSelected() === row
    }

    cloneProduct($event: PointerEvent, row: ShelveProduct) {
        $event.stopPropagation();
        this.#sideNavService.productSelected.set(row);

        setTimeout(()=> {
            this.#sideNavService.toggleSidenavSource.next();
        }, 0); //Microtask
    }

    protected removeProduct($event: PointerEvent, product: ShelveProduct) {
        $event.stopPropagation();

        const modalMsg = this.#i18nService.translate(this.#mf, "remove.single.product", `${product.name} (${product.shelveCode})`);

        const dialogRef = this.#dialog.open(ConfirmationModalComponent, {
            data: {title: this.#i18nService.translate(this.#mf, "modal.title"), message: modalMsg},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                this.#shelveProductService.removeProduct(product.shelveCode).then(
                    () => {
                        this.#statisticsPanelService.getStatistics();
                        this.#tableService.dataSource.set(this.#tableService.dataSource().filter(shelveProduct => shelveProduct.shelveCode !== product.shelveCode));
                        this.#toastr.success(`Product "${product.shelveCode}" was removed.`, '', {
                            positionClass: 'toast-bottom-left'
                        });
                        this.#tableService.selection.set(new SelectionModel<ShelveProduct>(true, []));
                    }
                )
            }
        });

    }
}
