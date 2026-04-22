import { inject, Injectable, signal } from '@angular/core';
import { ShelveProductService } from '../../data-source/shelve-product.service';
import { ShelveProductCount } from '../../interface/shelve-product.interface';

@Injectable()
export class StatisticsPanelService {
    readonly #shelveProductService = inject(ShelveProductService);

    readonly statistics = signal<ShelveProductCount[]>([]);

    getStatistics() {
        this.#shelveProductService.getStatistics().then( (data: ShelveProductCount[]) => {
            this.statistics.set(data);
        })
    }
}
