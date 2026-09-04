import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  CollapsableComponent,
  InternalizationPipe,
  KeyValueComponent,
} from '@central-hub/library';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';
import { derivedAsync } from 'ngxtension/derived-async';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'gameq-configuration-administration',
  templateUrl: './configuration.html',
  styleUrl: './configuration.scss',
  imports: [
    CollapsableComponent,
    InternalizationPipe,
    JsonPipe,
    KeyValueComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Configuration {
  readonly #gameqAdministrationApi = inject(GameqAdministrationApi);
  //readonly #i18nService = inject(I18nService);
  //readonly #toastr = inject(ToastrService);
  //readonly #dialog = inject(MatDialog);

  readonly platformConfigurations = derivedAsync(
    () => this.#gameqAdministrationApi.getConfigurations(),
    {
      initialValue: {
        platforms: []
      },
    },
  );

  /* readonly catConfigConfigurationEdit = signal(false);

  readonly form = new FormGroup({
    configurationData: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.#gameqAdministrationApi.getConfigurations().then((configuration) => {
      const configurationToDisplay =
        typeof configuration === 'string'
          ? JSON.parse(configuration)
          : configuration;

      this.configuration.set(configurationToDisplay);
      this.form.patchValue({
        configurationData: JSON.stringify(configurationToDisplay, null, 2),
      });
      this.form.get('configurationData')?.disable();
    });
  }

  onChangeEditState() {
    this.catConfigConfigurationEdit.set(!this.catConfigConfigurationEdit());
    if (this.catConfigConfigurationEdit()) {
      this.form.get('configurationData')?.enable();
    } else {
      this.form.get('configurationData')?.disable();
    }
  }

  private updatePlatformConfiguration(_configuration: string) {
    /* this.#gameqAdministrationApi
      .updatePlatformConfiguration(configuration)
      .then(() => {
        const successTitle = this.#i18nService.translate(
          'gameq.catconfig.configuration.title',
        );
        const successMessage = this.#i18nService.translate(
          'gameq.catconfig.updated',
        );

        this.#toastr.success(successMessage, successTitle, {
          positionClass: 'toast-bottom-left',
        });

        this.catConfigConfigurationEdit.set(false);
        this.form.get('configurationData')?.disable();
      }); */
  /* throw Error('To be implemented');
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
      if (result !== undefined) {
        const configuration = this.form.get('configurationData')?.value ?? '';
        this.updatePlatformConfiguration(configuration);
      }
    });
  } */
}
