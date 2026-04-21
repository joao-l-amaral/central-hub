import {Injectable, signal} from '@angular/core';
import {ShelveProduct} from '../interface/shelve-product.interface';
import {Subject} from 'rxjs';

@Injectable()
export class SideNavService {

    defaultShelveProduct: ShelveProduct = {shelveCode: '', date: '', barCode: '', expiryDate: '', name: '', calories: 0, weight: 0};

    readonly productSelected = signal<ShelveProduct>(this.defaultShelveProduct);

    toggleSidenavSource = new Subject<void>();
    toggleSidenavClose = new Subject<void>();

    readonly isEditMode = signal<boolean>(false);

}
