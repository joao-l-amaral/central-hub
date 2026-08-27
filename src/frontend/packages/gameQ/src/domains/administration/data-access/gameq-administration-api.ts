import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GameqAdministrationApi {
  readonly #httpClient = inject(HttpClient);

  public getConfigurations() {
    return firstValueFrom(
      this.#httpClient.get<string>('/api/gameq/administration/configuration'),
    );
  }
}
