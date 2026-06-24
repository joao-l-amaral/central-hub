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
import {
  ActivatedRoute,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  PageResourcesComponentConfig,
  ResourceConfig,
} from './sidebar-interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import {TODO_NOTES} from "@schematics/angular/refactor/jasmine-vitest/utils/todo-notes";

@Component({
  selector: 'lib-nav-panel-module',
  templateUrl: 'sidebar-nav.html',
  styleUrls: ['sidebar-nav.scss'],
  imports: [RouterOutlet, NgClass, RouterLinkActive],
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

  optionHandler(component: Type<unknown>) {
    this.injectedComponent.set(component);
    this.usingSideNav.set(true);
  }

}
/*
TODO:
- Fix the CSS!!!!
 */
