import { inject, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { RemoteMeta } from './remotes';
import { RemoteRegistry } from './remote-registry';

export function providerRemotesStatus(remotesConfig: RemoteMeta[]) {
  return makeEnvironmentProviders([
    RemoteRegistry,
    provideAppInitializer(async () => {
      const remoteRegistry = inject(RemoteRegistry);
      remoteRegistry.initializeRemotes(remotesConfig);

      await remoteRegistry.checkRemotesStatus(remotesConfig);
    })
  ]);
}
