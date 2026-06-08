import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  output,
} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[chButton]',
  template: `
    @if (icon()) {
      <span class="ch-btn__icon">
        <i [ngClass]="icon()"></i>
      </span>
    }
    @if (label()) {
      <span>{{ label() }}</span>
    }
  `,
  styleUrls: ['./button.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ch-btn',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.title]': 'label()',
    '[class.ch-btn--primary]': 'type() === "primary"',
    '[class.ch-btn--secondary]': 'type() === "secondary"',
    '[class.ch-btn--tertiary]': 'type() === "tertiary"',
    '[class.ch-btn--sm]': 'size() === "sm"',
    '[class.ch-btn--md]': 'size() === "md"',
    '[class.ch-btn--lg]': 'size() === "lg"',
    '[class.ch-btn--full]': 'fullWidth()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-loading]': 'loading()',
  },
  imports: [NgClass],
})
export class ButtonComponent {
  readonly type = input.required<'primary' | 'secondary' | 'tertiary'>();
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly label = input<string>();
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly fullWidth = input<boolean>(false);
  readonly icon = input<string>();
  readonly clicked = output<MouseEvent>();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.clicked.emit(event);
  }

  // TODO
  // - loading spinner
  // - ver se removo isto: eslint-disable-next-line @angular-eslint/component-selector
}
