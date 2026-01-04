import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MF_FRONTEND } from '../../pipes';
import { I18nService } from '../../services';

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
        CommonModule,
        MatDialogContent,
        MatButton,
        MatDialogActions,
        FormsModule,
        MatDialogClose,
        MatDialogTitle
    ],
    providers: [
        { provide: MF_FRONTEND, useValue: 'portal' }
    ]
})
export class ConfirmationModalComponent {

    readonly dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);
    readonly product = model(this.data.message);
    private readonly mf = inject(MF_FRONTEND);
    private readonly i18nService = inject(I18nService);

    readonly okTranslation = this.i18nService.translate(this.mf, "commons.ok");
    readonly cancelTranslation = this.i18nService.translate(this.mf, "commons.cancel");

    onNoClick(): void {
        this.dialogRef.close();
    }
}
