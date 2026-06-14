import { makeEnvironmentProviders } from '@angular/core';
import { LoadingBlockService } from './loading-block-service';

export function loadingBlockProviders() {
  return makeEnvironmentProviders([LoadingBlockService]);
}
