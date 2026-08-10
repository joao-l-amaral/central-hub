import { makeEnvironmentProviders } from '@angular/core';
import { LoadingBlockService } from './loading-block-service';

export function provideLoadingBlock() {
  return makeEnvironmentProviders([LoadingBlockService]);
}
