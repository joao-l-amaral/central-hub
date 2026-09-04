import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ButtonComponent,
  ConfirmationModalComponent,
  HeaderComponent,
  I18nService,
  InternalizationPipe,
} from '@central-hub/library';
import { Configuration } from './feature-configuration/configuration';
import { Actions } from './feature-action/actions';
import { GamePlatformApiService } from '../../app/data-source/game-platform-api.service';
import { PlatformSelectorComponent } from './feature-platform-selector/platform-selector';
import { GameqAdministrationApi } from './data-access/gameq-administration-api';
import { MatDialog } from '@angular/material/dialog';
import { EditCard } from './feature-edit-card/edit-card';

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
  readonly #i18nService = inject(I18nService);
  readonly #dialog = inject(MatDialog);

  catConfigConfigurationEdit = false;

  onChangeEditState() {
    this.catConfigConfigurationEdit = !this.catConfigConfigurationEdit;
  }
  onSaveConfiguration() {
    const modalMsg = this.#i18nService.translate(
      'gameq.catconfig.edit.description',
    );

    const dialogRef = this.#dialog.open(ConfirmationModalComponent, {
      data: {
        title: this.#i18nService.translate('gameq.catconfig.edit.title'),
        message: modalMsg,
      },
      position: { top: '100px' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      /*if (result !== undefined) {

      } */
    });
  }
}
