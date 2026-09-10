import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef, inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ButtonComponent,
  ConfirmationModalComponent,
  I18nService,
  InternalizationPipe,
} from '@central-hub/library';
import { MatDialog } from '@angular/material/dialog';
import { GameqAdministrationApi } from '../data-access/gameq-administration-api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gameq-administration-edit-card',
  templateUrl: './edit-card.html',
  styleUrl: 'edit-card.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, ButtonComponent, InternalizationPipe],
})
export class EditCard {
  readonly #i18nService = inject(I18nService);
  readonly #dialog = inject(MatDialog);
  readonly #gameqAdministrationApi = inject(GameqAdministrationApi);
  readonly #toastr = inject(ToastrService);

  readonly configuration = input<string>();
  readonly changeConfigurationStatus = output<void>();

  readonly textareaRef = viewChild<ElementRef<HTMLTextAreaElement>>('textarea');
  readonly lineNumbersRef =
    viewChild<ElementRef<HTMLDivElement>>('lineNumbers');

  readonly textControl = new FormControl('{\n  \n}', { nonNullable: true });

  readonly errorMessage = signal<string | null>(null);
  readonly errorLine = signal<number | null>(null);

  readonly lineNumbersArray = computed(() => {
    const lineCount = this.textControl.value.split('\n').length;
    return Array.from({ length: lineCount }, (_, i) => i + 1);
  });

  constructor() {
    effect(() => {
      const configuration = this.configuration();
      if (configuration && configuration.length > 0) {
        this.textControl.setValue(configuration);
        this.formatJson();
      }
    });

    this.textControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.#validate());
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = this.textControl.value;
      this.textControl.setValue(
        value.substring(0, start) + '  ' + value.substring(end),
      );
      queueMicrotask(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  }

  #validate() {
    try {
      JSON.parse(this.textControl.value);
      this.errorMessage.set(null);
      this.errorLine.set(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid JSON';
      this.errorMessage.set(message);
      this.errorLine.set(this.#extractErrorLine(message));
    }
  }

  #extractErrorLine(errorMessage: string): number | null {
    const positionMatch = new RegExp(/position (\d+)/).exec(errorMessage);
    if (!positionMatch) return null;

    const position = Number.parseInt(positionMatch[1], 10);
    const textBeforeError = this.textControl.value.substring(0, position);
    return textBeforeError.split('\n').length;
  }

  formatJson(): void {
    try {
      const parsed = JSON.parse(this.textControl.value);
      this.textControl.setValue(JSON.stringify(parsed, null, 2));
      this.errorMessage.set(null);
      this.errorLine.set(null);
    } catch (err) {
      this.errorMessage.set(
        err instanceof Error ? err.message : 'Cannot format invalid JSON',
      );
    }
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
        this.#gameqAdministrationApi
          .updateConfigurations(JSON.parse(this.textControl.value))
          .then(() =>
            this.#toastr.success(
              this.#i18nService.translate('gameq.catconfig.edit.success'),
            ),
          );
      }
    });
  }

  protected onChangeEditState() {
    this.changeConfigurationStatus.emit();
  }
}
