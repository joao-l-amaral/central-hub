import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoggingService } from '@central-hub/library';

export const gameGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const logger = inject(LoggingService);
  const gameName = route.queryParamMap.get('game');

  if (!gameName) {
    logger.log('Game not found');
    return router.parseUrl('/gameQ');
  }

  return true;
};
