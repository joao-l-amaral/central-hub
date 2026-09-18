import {
  ComponentRef,
  Directive,
  effect,
  inject,
  input,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { RemoteRegistry } from './remote-registry';

@Directive({
  selector: '[chInsertRemoteComponent]',
  standalone: true,
})
export class InsertRemoteComponentDirective {
  readonly #remotes = inject(RemoteRegistry);
  readonly #vcr = inject(ViewContainerRef);

  readonly remoteName = input.required<string>();
  readonly remoteComponent = input.required<string>();

  readonly #componentRef = signal<ComponentRef<unknown> | null>(null);
  readonly loadError = signal(false);

  constructor() {
    effect(() => {
      const name = this.remoteName();
      const component = this.remoteComponent();

      this.#vcr.clear();
      this.loadError.set(false);

      const isAvailable = this.#remotes.getRemoteStatus(name) === 'available';
      if (!isAvailable) {
        this.loadError.set(true);
        return;
      }

      loadRemoteModule(name, component)
        .then((m) => {
          const componentClass = m[Object.keys(m)[0]] ?? m.default;
          const ref = this.#vcr.createComponent(componentClass);
          this.#componentRef.set(ref);
        })
        .catch(() => this.loadError.set(true));
    });
  }
}
