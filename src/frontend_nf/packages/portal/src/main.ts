import { initFederation } from '@angular-architects/native-federation';
import 'bootstrap/dist/js/bootstrap.bundle';

fetch('/assets/federation.manifest.json')
  .then(res => res.json())
  .then(manifest => {
    const manigestKeys = Object.keys(manifest);
    sessionStorage.setItem('federationManifest', JSON.stringify(manigestKeys))
    return initFederation(manifest);
  })
  .then(() => import('./bootstrap'))
  .catch(err => console.error(err));
