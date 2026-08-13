import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Data, RouterOutlet } from '@angular/router';
import {
  PageResourcesComponentConfig,
  ResourceConfig,
  ResourceConfigurations,
} from './sidebar-interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { InternalizationPipe } from '../../util-i18n';
import { map } from 'rxjs';

@Component({
  selector: 'lib-nav-panel',
  templateUrl: 'sidebar-nav.html',
  styleUrls: ['sidebar-nav.scss'],
  imports: [RouterOutlet, NgClass, InternalizationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarNavigationComponent {
  readonly #activatedRoute = inject(ActivatedRoute, { optional: true });

  readonly container = viewChild('bodyArea', { read: ViewContainerRef });

  readonly resourceConfigurations = input<ResourceConfigurations>([]);

  readonly injectedComponent = signal<Type<unknown> | null>(null);
  readonly usingSideNav = signal<boolean>(false);

  constructor() {

    this.injectedComponent.set(this.resourceConfigurations()[0]?.component);
    effect(() => {
      const container = this.container();
      const component = this.injectedComponent();

      container?.clear();

      if (container && component) {
        container.createComponent(component);
      }
    });
  }

  readonly data = toSignal(
    this.#activatedRoute?.data ??
      toObservable(this.resourceConfigurations).pipe(
        map((resources) => ({ config: { resources } })),
      ),
    {
      initialValue: this.#activatedRoute?.snapshot.data ?? {
        config: { resources: this.resourceConfigurations() },
      },
    },
  );

  readonly dataResourcesOptions = computed<ResourceConfig[]>(() => {
    const data: Data = this.data();
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
