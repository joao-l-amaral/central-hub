import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavComponent } from './features/nav/nav.component';
import { filter, Subscription } from 'rxjs';
import { BreadcrumbComponent } from './features/breadcrumb/breadcrumb.component';
import { BreadcrumbStateService } from './features/breadcrumb/breadcrumb-state';
import { I18nInitialization } from '@portal-library';

@Component({
  imports: [RouterModule, NavComponent, BreadcrumbComponent],
  selector: 'ch-root',
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent implements OnDestroy {
  protected title = 'CentralHub';
  readonly #routerTracker: Subscription;

  readonly #router = inject(Router);
  readonly #breadcrumbState = inject(BreadcrumbStateService);
  readonly i18nInitialization = inject(I18nInitialization);

  isDictionaryLoaded = this.i18nInitialization.areAllDictionaryLoaded;

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
