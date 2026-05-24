import { Injectable, signal } from '@angular/core';
import { ShelveProduct } from '../../interface/shelve-product.interface';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable()
export class TableService {

    readonly isLoadingResults = signal<boolean>(true);

    readonly dataSource = signal<ShelveProduct[]>([]);

    readonly selection = signal<SelectionModel<ShelveProduct>>(new SelectionModel<ShelveProduct>(true, []));

}
