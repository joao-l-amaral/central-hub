import {ComponentHarness} from "@angular/cdk/testing";

export class LoadingBlockHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-loading-block';

  readonly #loadingSpinner = this.locatorForOptional('.ch-loader__md');

  async isLoading() {
    return !!await this.#loadingSpinner();
  }
}
