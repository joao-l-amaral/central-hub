import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent, InternalizationPipe } from '@central-hub/library';
import { Configuration } from './feature-configuration/configuration';
import { Actions } from './feature-action/actions';
import { GamePlatformApiService } from '../../app/data-source/game-platform-api.service';
import { PlatformSelectorComponent } from './feature-platform-selector/platform-selector';
import { GameqAdministrationApi } from './data-access/gameq-administration-api';

@Component({
  selector: 'gameq-administration-administration',
  templateUrl: './administration.html',
  styleUrl: './administration.scss',
  imports: [
    HeaderComponent,
    InternalizationPipe,
    Configuration,
    Actions,
    PlatformSelectorComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GamePlatformApiService, GameqAdministrationApi],
})
export class Administration {}
