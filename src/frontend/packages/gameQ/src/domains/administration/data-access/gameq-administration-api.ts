import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Platforms } from '../../../models/platform';

@Injectable()
export class GameqAdministrationApi {
  readonly #httpClient = inject(HttpClient);

  public getConfigurations() {
    return firstValueFrom(
      this.#httpClient.get<Platforms>(
        '/api/gameq/administration/configuration',
      ),
    );
  }

  public updateSelectedConsole(consoleName: string, isToImport: boolean) {
    return firstValueFrom(
      this.#httpClient.put('/api/gameq/administration/selected-console', { consoleName, isToImport })
    );
  }
}
