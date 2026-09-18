import { ComponentHarness } from '@angular/cdk/testing';

export class ConfigurationHarness extends ComponentHarness {
  static readonly hostSelector = 'gameq-configuration-administration';

  readonly #collapsable = this.locatorForOptional('lib-collapsable');
  readonly #keyValues = this.locatorForAll('lib-key-value');

  async isCollapsableVisible() {
    return (await this.#collapsable()) !== null;
  }

  async getPlatformsCount() {
    return (await this.#keyValues()).length;
  }
}