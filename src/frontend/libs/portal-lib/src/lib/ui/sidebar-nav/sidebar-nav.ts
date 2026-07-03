import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
  PageResourcesComponentConfig,
  ResourceConfig,
} from './sidebar-interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { InternalizationPipe } from '../../util-i18n';

@Component({
  selector: 'lib-nav-panel-module',
  templateUrl: 'sidebar-nav.html',
  styleUrls: ['sidebar-nav.scss'],
  imports: [RouterOutlet, NgClass, InternalizationPipe, InternalizationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarNavigationComponent {
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly container = viewChild('bodyArea', { read: ViewContainerRef });

  readonly injectedComponent = signal<Type<unknown> | null>(null);
  readonly usingSideNav = signal<boolean>(false);

  constructor() {
    effect(() => {
      const container = this.container();
      const component = this.injectedComponent();

      container?.clear();

      if (container && component) {
        container.createComponent(component);
      }
    });
  }

  readonly data = toSignal(this.#activatedRoute.data, {
    initialValue: this.#activatedRoute.snapshot.data,
  });

  readonly dataResourcesOptions = computed<ResourceConfig[]>(() => {
    const data = this.data();
    const config = data['config'] as PageResourcesComponentConfig;

    return config.resources ?? [];
  });

  readonly selectedOption = computed(() => {
    return this.injectedComponent();
  });

  optionHandler(component: Type<unknown>) {
    this.injectedComponent.set(component);
    this.usingSideNav.set(true);
  }
}
