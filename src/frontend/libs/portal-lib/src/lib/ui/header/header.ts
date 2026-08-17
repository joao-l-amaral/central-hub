import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly text = input.required<string>();
  readonly subText = input<string | null>();
  readonly icon = input<string>();
}
