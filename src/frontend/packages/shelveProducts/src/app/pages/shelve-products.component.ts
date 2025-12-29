import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { FormComponent } from '../ui/form/form.component';
import { MatIcon } from '@angular/material/icon';
import { StatisticsPanelComponent } from '../ui/statistics-panel/statistics-panel.component';
import { TableComponent } from '../ui/table/table.component';
import { TableService } from '../ui/table/table.service';
import { ShelveProductService } from '../data-source/shelve-product.service';
import { SideNavService } from '../services/side-nav.service';
import { StatisticsPanelService } from '../ui/statistics-panel/statistics-panel.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../portal-lib/src/lib/ui/confirmation-modal/confirmation-modal.component';
import { I18nService, InternalizationPipe, MF_FRONTEND } from '@portal/library';
import { SelectionModel } from '@angular/cdk/collections';
import { ShelveProduct } from '../interface/shelve-product.interface';

@Component({
    selector: 'shelve-products-root',
    templateUrl: './shelve-products.component.html',
    styleUrl: './shelve-products.component.scss',
    imports: [
        CommonModule,
        FormComponent,
        InternalizationPipe,
        MatIcon,
        MatIconButton,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        StatisticsPanelComponent,
        TableComponent
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        TableService,
        ShelveProductService,
        SideNavService,
        StatisticsPanelService,
        { provide: MF_FRONTEND, useValue: 'shelveProducts' }
    ]
})
export class ShelveProductsComponent  implements OnDestroy {
    private readonly statisticsPanelService = inject(StatisticsPanelService);
    private readonly tableService = inject(TableService);
    private readonly sideNavService = inject(SideNavService);
    private readonly shelveProductService = inject(ShelveProductService);
    private readonly toastr = inject(ToastrService);
    private readonly dialog = inject(MatDialog);
    private readonly I18nService = inject(I18nService);
    private readonly mf = inject(MF_FRONTEND);

    @ViewChild('sidenav') sidenav!: MatSidenav;

    events: string[] = [];
    opened = false;
    private sub: Subscription;
    private subClose: Subscription;
    private subChanged: Subscription;

    private defaultShelveProduct = this.sideNavService.defaultShelveProduct;

    deletionDisable = signal<boolean>(true);


    constructor() {

        console.info("--- ShelveProductsComponent initialized ---");
        this.sub = this.sideNavService.toggleSidenavSource.subscribe(() => {
            if(!this.sidenav.opened) {
                this.sidenav.toggle();
            }
        });
        this.subClose = this.sideNavService.toggleSidenavClose.subscribe(() => {
            if(this.sidenav.opened) {
                this.sidenav.close();
            }
        });
        this.subChanged = this.tableService.selection().changed.subscribe(() => {
            let hasValue = !this.tableService.selection().hasValue();
            this.deletionDisable.set(hasValue);
        });
    }

    protected async refreshProducts() {
        this.tableService.isLoadingResults.set(true);
        let shelveProducts = await this.shelveProductService.getShelveProduct();
        this.tableService.dataSource.set(shelveProducts);
        this.tableService.isLoadingResults.set(false);
    }

    protected addProduct(){
        this.sideNavService.isEditMode.set(false);
        this.sideNavService.productSelected.set(this.defaultShelveProduct);
        if(!this.sidenav.opened) {
            this.sidenav.toggle();
        } else {
            this.sidenav.close();
            this.sidenav.toggle();
        }
    }

    protected removeProducts() {
        let selectedProducts = this.tableService.selection().selected;

        const modalMsg = (selectedProducts?.length > 1) ?
            this.I18nService.translate(this.mf, "remove.multi.product", selectedProducts.map(product => product.shelveCode).join(', ')) :
            this.I18nService.translate(this.mf, "remove.one.product");

        const dialogRef = this.dialog.open(ConfirmationModalComponent, {
            data: {title: this.I18nService.translate(this.mf, "modal.title"), message: modalMsg},
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                for (let product of selectedProducts) {
                    this.shelveProductService.removeProduct(product.shelveCode).then(
                        () => {
                            this.statisticsPanelService.getStatistics();
                            this.tableService.dataSource.set(this.tableService.dataSource().filter(shelveProduct => shelveProduct.shelveCode !== product.shelveCode));
                            this.toastr.success(`Product "${product.shelveCode}" was removed.`, '', {
                                positionClass: 'toast-bottom-left'
                            });
                            this.tableService.selection.set(new SelectionModel<ShelveProduct>(true, []));
                        }
                    )
                }
            }
        });

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.subClose.unsubscribe();
        this.subChanged.unsubscribe();
    }

    closeNav() {
        this.sidenav.toggle()
        this.sideNavService.productSelected.set(this.defaultShelveProduct);
    }
}
