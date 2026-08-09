import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'lib-alert-component',
  templateUrl: './alert-component.html',
  styleUrls: ['./alert-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent],
  host: {
    '[class.alert_small]': 'subtitle().length === 0',
  },
})
export class AlertComponent {
  readonly status = input.required<'info' | 'warning' | 'danger'>();
  readonly title = input.required();
  readonly subtitle = input('');
  readonly dismissible = input(false);
  readonly visible = input(true);
  readonly visibleChange = output<boolean>();

  readonly #iconClassHandler = {
    ['warning']: 'bi bi-exclamation-triangle',
    ['danger']: 'bi bi-x-circle',
    ['info']: 'bi bi-info-circle',
  };

  readonly icon = computed(() => {
    return this.#iconClassHandler[this.status()];
  });

  onClose() {
    this.visibleChange.emit(false);
  }
}
