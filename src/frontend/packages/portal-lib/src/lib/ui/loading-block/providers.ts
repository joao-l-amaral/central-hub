import {inject, makeEnvironmentProviders, provideAppInitializer} from "@angular/core";
import {LoadingBlockService} from "./loading-block-service";

export function loadingBlockProviders() {
  return makeEnvironmentProviders([
    LoadingBlockService,
    provideAppInitializer(async () => inject(LoadingBlockService)),
  ]);
}
