import { Injectable, signal } from '@angular/core';
import { Platform } from './configuration-interface';

@Injectable()
export class GameQConfigurationState {
  readonly platforms = signal<Platform[]>([]);

  getPlatformIconByName(platformName: string | null) {
    if(platformName) {
      return this.platforms().find(
        (platform) => platform.platformName === platformName,
      )?.icon;
    }

    return "";
  }
}
