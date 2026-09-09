import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  ButtonComponent,
  HeaderComponent,
  InternalizationPipe,
} from '@central-hub/library';
import { Configuration } from './feature-configuration/configuration';
import { Actions } from './feature-action/actions';
import { GamePlatformApiService } from '../../app/data-source/game-platform-api.service';
import { PlatformSelectorComponent } from './feature-platform-selector/platform-selector';
import { GameqAdministrationApi } from './data-access/gameq-administration-api';
import { EditCard } from './feature-edit-card/edit-card';
import { derivedAsync } from 'ngxtension/derived-async';

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
    ButtonComponent,
    EditCard,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GamePlatformApiService, GameqAdministrationApi],
})
export class Administration {
  readonly #gameqAdministrationApi = inject(GameqAdministrationApi);

  readonly configurations = derivedAsync(
    () => this.#gameqAdministrationApi.getConfigurations(),
    {
      initialValue: {
        platforms: [],
      },
    },
  );

  readonly configurationsAsString = computed(() =>
    JSON.stringify(this.configurations()),
  );

  catConfigConfigurationEdit = false;

  onChangeEditState() {
    this.catConfigConfigurationEdit = !this.catConfigConfigurationEdit;
  }
}
