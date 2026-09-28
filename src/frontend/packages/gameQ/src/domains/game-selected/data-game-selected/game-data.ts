import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game } from './game';

@Injectable()
export class GameData {
  readonly #http = inject(HttpClient);

  getGame(gameName: string) {
      return firstValueFrom(
        this.#http.get<Game>(`/api/gameq/game/${gameName}`),
      );
  }

}
