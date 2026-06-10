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
import { MF_FRONTEND } from '../../pipes';
import { I18nService } from '../../services';
import { ButtonComponent } from '../button/button';

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
  ],
  providers: [{ provide: MF_FRONTEND, useValue: 'portal' }],
})
export class ConfirmationModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly product = model(this.data.message);
  private readonly mf = inject(MF_FRONTEND);
  private readonly i18nService = inject(I18nService);

  readonly okTranslation = this.i18nService.translate(this.mf, 'commons.ok');
  readonly cancelTranslation = this.i18nService.translate(
    this.mf,
    'commons.cancel',
  );

  onNoClick(): void {
    this.dialogRef.close();
  }
}
