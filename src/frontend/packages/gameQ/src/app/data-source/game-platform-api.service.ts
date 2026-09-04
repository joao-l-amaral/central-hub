import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, shareReplay } from 'rxjs';
import { Platforms } from '../interfaces/game-platforms.interface';

@Injectable()
export class GamePlatformApiService {

    private readonly httpClient = inject(HttpClient);

    public getPlatforms() {
        return firstValueFrom(this.httpClient.get<Platforms>("/api/games/listOfPlatforms").pipe(shareReplay(1)));
    }

    public updatePlatform(platformsToUpdate: string[]) {
        return firstValueFrom(this.httpClient.patch("/api/games/updatePlatforms", platformsToUpdate));
    }

    public getConfigurations() {
        return firstValueFrom(
          this.httpClient.get<string>(
            '/api/gameq/administration/configuration',
          ),
        );
    }

    public updatePlatformConfiguration(configuration: string) {
        return firstValueFrom(this.httpClient.put("/api/games/updatePlatformConfiguration", configuration));
    }

    public forceGameSynchronization() {
        return firstValueFrom(this.httpClient.get<string>("/api/games/forceLoadGameVaultDatabase"));
    }
}
