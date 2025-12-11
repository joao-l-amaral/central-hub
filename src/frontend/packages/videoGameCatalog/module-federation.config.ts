import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'videoGameCatalog',
  exposes: {
    './Routes': 'packages/videoGameCatalog/src/app/remote-entry/entry.routes.ts',
  }
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
