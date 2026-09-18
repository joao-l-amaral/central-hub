import { Injectable, computed, signal, inject } from '@angular/core';
import { RemoteMeta, RemotesConfig } from './remotes';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RemoteRegistry {
  readonly #http = inject(HttpClient);

  private readonly state = signal<Record<string, RemoteMeta>>({});

  readonly remotes = computed(() => Object.values(this.state()));

  readonly availableRemotes = computed(() =>
    this.remotes().filter((remote) => remote.status === 'available'),
  );

  readonly unavailableRemotes = computed(() =>
    this.remotes().filter((remote) => remote.status === 'unavailable'),
  );

  initializeRemotes(definitions: RemotesConfig) {
    this.state.set(
      Object.fromEntries(
        definitions.map((remote) => [
          remote.name,
          {
            ...remote,
            status: 'unknown',
          },
        ]),
      ),
    );
  }

  getRemoteStatus(remoteName: string) {
    const remoteMetas = this.state();
    return remoteMetas[remoteName]?.status;
  }

  #setAvailable(name: string) {
    this.#update(name, {
      status: 'available'
    });
  }

  #setUnavailable(name: string) {
    this.#update(name, {
      status: 'unavailable'
    });
  }

  async checkRemotesStatus(remotes: RemotesConfig) {
    await Promise.all(remotes.map((remote) => this.#checkOne(remote)));
  }

  async #checkOne(remote: RemoteMeta) {
    try {
      await firstValueFrom(
        this.#http.get(remote.url, {
          responseType: 'text',
        }),
      );

      this.#setAvailable(remote.name);
    } catch (_error) {
      this.#setUnavailable(remote.name);
    }
  }

  #update(name: string, value: Partial<RemoteMeta>) {
    this.state.update((current) => {
      const remote = current[name];

      if (!remote) {
        return current;
      }

      return {
        ...current,
        [name]: {
          ...remote,
          ...value,
        },
      };
    });
  }
}
