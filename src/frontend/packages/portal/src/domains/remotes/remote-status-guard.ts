import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RemoteRegistry } from './remote-registry';

export const remoteStatusGuard: CanMatchFn = (route, _segments) => {
  const registry = inject(RemoteRegistry);
  const router = inject(Router);

  const name = route?.['path'];
  const remote = registry.remotes().find((r) => r.name === name);

  return remote?.status === 'available'
    ? true
    : router.createUrlTree(['/error']);
};
