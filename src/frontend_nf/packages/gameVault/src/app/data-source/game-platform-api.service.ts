import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, shareReplay } from 'rxjs';
import { Platforms } from '../interfaces/game-platforms.interface';

@Injectable()
export class GamePlatformApiService {

    private readonly httpClient = inject(HttpClient);

    public getPlatforms() {
        return firstValueFrom(this.httpClient.get<Platforms>("/games/api/listOfPlatforms").pipe(shareReplay(1)));
    }

    public updatePlatform(platformsToUpdate: string[]) {
        return firstValueFrom(this.httpClient.patch("/games/api/updatePlatforms", platformsToUpdate));
    }

    public getConfigurations() {
        return firstValueFrom(this.httpClient.get<string>("/games/api/configuration"));
    }

    public updatePlatformConfiguration(configuration: string) {
        return firstValueFrom(this.httpClient.put("/games/api/updatePlatformConfiguration", configuration));
    }

    public forceGameSynchronization() {
        return firstValueFrom(this.httpClient.get<string>("/games/api/forceLoadGameVaultDatabase"));
    }
}
