import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, shareReplay} from 'rxjs';
import {ShelveProduct, ShelveProductCount} from '../interface/shelve-product.interface';

@Injectable()
export class  ShelveProductService {

    private readonly httpClient = inject(HttpClient);

    public getShelveProduct() {
        return firstValueFrom(this.httpClient.get<ShelveProduct[]>("/shelve/api/products").pipe(shareReplay(1)));
    }

    public saveShelveProduct(payload: ShelveProduct) {
        return firstValueFrom(this.httpClient.post<ShelveProduct>("/shelve/api/product", payload).pipe(shareReplay(1)));
    }

    public removeProduct(code: string) {
        return firstValueFrom(this.httpClient.delete(`/shelve/api/product/${code}`));
    }

    public updateProduct(code: string, payload: ShelveProduct) {
        return firstValueFrom(this.httpClient.patch<ShelveProduct>(`/shelve/api/product/${code}`, payload));
    }

    public getStatistics() {
        return firstValueFrom(this.httpClient.get<ShelveProductCount[]>("/shelve/api/productStatistics/"));
    }

}
