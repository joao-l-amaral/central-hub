import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Configuration } from '../util-configuration/configuration-interface';
import { SearchGameResult } from '../feature-games-list-dropdown/games-list-interface';
import { CACHE_CONTEXT } from '@central-hub/library';

@Injectable()
export class GameQAPI {
  readonly #httpClient = inject(HttpClient);

  public getConfigurations() {
    return firstValueFrom(this.#httpClient.get<Configuration>('/api/gameq/'));
  }

  public initialSearch(query: string) {
    const context = new HttpContext();
    context.set(CACHE_CONTEXT, true);
    return firstValueFrom(
      this.#httpClient.get<SearchGameResult[]>(
        `/api/gameq/initialSearch?game=${encodeURIComponent(query)}`,
        { context }
      ),
    );
  }
}
