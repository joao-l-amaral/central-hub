import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GameData {
  readonly #http = inject(HttpClient);

  getSelectedGame(gameName: string) {
    return firstValueFrom(this.#http.get(gameName));
  }
}
