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
import { InternalizationPipe } from '../../util-i18n';
import { map } from 'rxjs';

@Component({
  selector: 'lib-nav-panel',
  templateUrl: 'sidebar-nav.html',
  styleUrls: ['sidebar-nav.scss'],
  imports: [RouterOutlet, InternalizationPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarNavigationComponent {
  readonly #activatedRoute = inject(ActivatedRoute, { optional: true });

  readonly container = viewChild('bodyArea', { read: ViewContainerRef });

  readonly resourceConfigurations = input<ResourceConfigurations>([]);

  readonly injectedComponent = signal<Type<unknown> | null>(null);

  usingSideNav = false;

  readonly queryParam = Object.keys(
    this.#activatedRoute?.snapshot.queryParams ?? {},
  )[0];

  constructor() {
    effect(() => {
      const container = this.container();
      const component = this.injectedComponent();

      container?.clear();

      if (container && component) {
        container.createComponent(component);
      }
    });

    effect(() => {
      const dataResourcesOptions = this.dataResourcesOptions();
      const currentResourceConfig = dataResourcesOptions.filter(
        (resource) => resource.queryParam === this.queryParam,
      );
      this.injectedComponent.set(currentResourceConfig[0]?.component);
      this.usingSideNav = true;
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
    this.usingSideNav = true;
  }
}

export default SideBarNavigationComponent
