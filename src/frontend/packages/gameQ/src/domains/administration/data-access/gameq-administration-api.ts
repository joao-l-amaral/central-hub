import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  Configurations
} from '../../../models/configurations-interface';

interface SyncGamesResponse {
  message: string;
  numberOfGamesImported: number;
  numberOfPlatformsImported: number;
}

@Injectable()
export class GameqAdministrationApi {
  readonly #httpClient = inject(HttpClient);

  public getConfigurations() {
    return firstValueFrom(
      this.#httpClient.get<Configurations>(
        '/api/gameq/administration/configuration',
      ),
    );
  }

  public updateConfigurations(configuration: string) {
    return firstValueFrom(
      this.#httpClient.put(
        '/api/gameq/administration/update-configurations',
        configuration,
      ),
    );
  }

  public updateSelectedConsole(consoleName: string, isToImport: boolean) {
    return firstValueFrom(
      this.#httpClient.put(
        `/api/gameq/administration/update-platform-import-status`,
        { consoleName, isToImport },
      ),
    );
  }

  public doSynchronizeGames() {
    return firstValueFrom(
      this.#httpClient.get<SyncGamesResponse>(
        '/api/gameq/administration/loadGameDatabase',
      ),
    );
  }
}
