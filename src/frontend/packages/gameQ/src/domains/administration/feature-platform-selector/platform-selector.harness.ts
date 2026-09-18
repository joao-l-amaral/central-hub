import { ComponentHarness } from '@angular/cdk/testing';

export class PlatformSelectorHarness extends ComponentHarness {
  static readonly hostSelector = 'gameq-platform-selector';

  readonly #table = this.locatorForOptional('lib-table-dt');

  async isTableVisible() {
    return (await this.#table()) !== null;
  }
}