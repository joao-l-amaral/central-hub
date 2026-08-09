import { Injectable, signal } from '@angular/core';
import { Platform } from './configuration-interface';

@Injectable()
export class GameQConfigurationState {
  readonly platforms = signal<Platform[]>([]);
}
