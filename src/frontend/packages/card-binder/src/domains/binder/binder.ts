import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './feature-card/card.component';

@Component({
  selector: 'cb-binder',
  templateUrl: './binder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class BinderComponent {
  readonly numbers = Array.from({ length: 1025 }, (_, i) => i + 1);
}
