import {
  inject,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { BinderState } from './binder-state';
import { CardBinderApi } from './card-binder-api';
import { firstValueFrom } from 'rxjs';

export function provideBinderData() {
  return makeEnvironmentProviders([
    BinderState,
    CardBinderApi,
    provideEnvironmentInitializer(async () => {
      const cardBinderApi = inject(CardBinderApi);
      const binderState = inject(BinderState);

      const cardCollection = await firstValueFrom(cardBinderApi.getCardCollection());
      binderState.binder.set(cardCollection);
    }),
  ]);
}
