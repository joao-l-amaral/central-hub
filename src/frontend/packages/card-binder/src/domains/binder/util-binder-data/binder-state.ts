import { Injectable, signal } from '@angular/core';
import { Card } from './card-interface';

@Injectable()
export class BinderState {
    readonly binder = signal<Card[]>([]);

    getCardByIndex(index: number) {
      return this.binder().find((card) => card.index === index);
    }
}
