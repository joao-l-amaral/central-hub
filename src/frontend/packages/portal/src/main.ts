import { initFederation } from '@angular-architects/native-federation';

async function startApplication() {
  const remoteConfigurations = await fetch('/api/remotes').then(res => res.json());

  const manifest: Record<string, string> = {};

  for(const remoteConfiguration of remoteConfigurations) {
    manifest[remoteConfiguration.name] = remoteConfiguration.url;
  }

  await initFederation(manifest);

  const { bootstrap } = await import('./bootstrap');
  await bootstrap(remoteConfigurations);
}

// eslint-disable-next-line no-console
startApplication().catch(err => console.error(err));
