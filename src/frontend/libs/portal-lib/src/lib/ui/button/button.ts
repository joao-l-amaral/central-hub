import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[chButton]',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ch-btn',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.title]': 'label() ?? title()',
    '[class.ch-btn__primary]': 'variant() === "primary"',
    '[class.ch-btn__secondary]': 'variant() === "secondary"',
    '[class.ch-btn__tertiary]': 'variant() === "tertiary"',
    '[class.ch-btn__danger]': 'variant() === "danger"',
    '[class.ch-btn__sm]': 'size() === "sm"',
    '[class.ch-btn__md]': 'size() === "md"',
    '[class.ch-btn__lg]': 'size() === "lg"',
    '[class.ch-btn__full]': 'fullWidth()',
    '[class.is-disabled]': 'isDisabled()',
    '[class.is-loading]': 'loading()',
  },
  imports: [NgClass],
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary' | 'tertiary' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly label = input<string>();
  readonly title = input<string>();
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly icon = input<string>();

  readonly isDisabled = computed(() => {
    return this.disabled() || this.loading();
  });
}
