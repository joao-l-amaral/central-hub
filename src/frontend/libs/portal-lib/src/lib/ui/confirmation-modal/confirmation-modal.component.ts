import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button';
import { I18nService } from '../../util-i18n';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'lib-confirmation-modal-component',
  templateUrl: './confirmation-modal.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatDialogClose,
    MatDialogTitle,
    ButtonComponent,
  ]
})
export class ConfirmationModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly product = model(this.data.message);
  private readonly i18nService = inject(I18nService);

  readonly okTranslation = this.i18nService.translate('commons.ok');
  readonly cancelTranslation = this.i18nService.translate('commons.cancel');

  onNoClick(): void {
    this.dialogRef.close();
  }
}
