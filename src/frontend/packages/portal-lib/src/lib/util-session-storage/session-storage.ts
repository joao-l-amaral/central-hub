import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorage {
  readonly remotes = JSON.parse(
    sessionStorage.getItem('federationManifest') ?? '{}',
  ) as string[]

  getRemotes() {
    return this.remotes;
  }
}
