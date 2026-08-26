import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BreadcrumbStateService } from '../feature-breadcrumb/breadcrumb-state';
import { NavbarComponent } from '../feature-navbar/navbar';
import { BreadcrumbComponent } from '../feature-breadcrumb/breadcrumb';
import {
  LoadingBlockComponent,
  LoadingBlockService
} from '@central-hub/library';

@Component({
  imports: [
    RouterModule,
    NavbarComponent,
    BreadcrumbComponent,
    LoadingBlockComponent,
  ],
  selector: 'ch-root',
  templateUrl: './portal.html',
  styleUrl: './portal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent implements OnDestroy {
  protected title = 'CentralHub';
  readonly #routerTracker: Subscription;

  readonly #router = inject(Router);
  readonly #breadcrumbState = inject(BreadcrumbStateService);
  readonly #loadingService = inject(LoadingBlockService);

  readonly loadingStatus = this.#loadingService.loading;

  constructor() {
    this.#routerTracker = this.#router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.#breadcrumbState.addPath(e.url);
      });
  }

  ngOnDestroy(): void {
    this.#routerTracker.unsubscribe();
  }
}
