import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Configuration } from '../util-configuration/configuration-interface';

@Injectable()
export class GameQAPI {
  private readonly httpClient = inject(HttpClient);

  public getConfigurations() {
    return firstValueFrom(this.httpClient.get<Configuration>('/api/gameq/'));
  }
}
