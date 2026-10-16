import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from './card-interface';

@Injectable()
export class CardBinderApi {
  readonly #httpClient = inject(HttpClient);

  public getCardCollection() {
    return this.#httpClient.get<Card[]>('/api/binder/own/all');
  }
}
