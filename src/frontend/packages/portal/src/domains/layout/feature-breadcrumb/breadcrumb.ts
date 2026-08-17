import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { BreadcrumbStateService } from './breadcrumb-state';
import { InternalizationPipe } from '@central-hub/library';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ch-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  imports: [InternalizationPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  readonly #breadcrumbState = inject(BreadcrumbStateService);

  breadcrumbPath = this.#breadcrumbState.breadcrumbPath;
}
