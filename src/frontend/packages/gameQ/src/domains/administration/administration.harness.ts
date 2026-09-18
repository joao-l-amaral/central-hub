import { ComponentHarness } from '@angular/cdk/testing';

export class AdministrationHarness extends ComponentHarness {
  static readonly hostSelector = 'gameq-administration-administration';

  readonly #header = this.locatorForOptional('lib-header');
  readonly #actions = this.locatorForOptional('gameq-actions-administration');
  readonly #platformSelector = this.locatorForOptional(
    'gameq-platform-selector',
  );
  readonly #configuration = this.locatorForOptional(
    'gameq-configuration-administration',
  );
  readonly #editCard = this.locatorForOptional(
    'gameq-administration-edit-card',
  );
  readonly #editConfigurationButton = this.locatorForOptional(
    '.administration-configuration__action button[chButton]',
  );

  async isHeaderVisible() {
    return (await this.#header()) !== null;
  }

  async isActionsVisible() {
    return (await this.#actions()) !== null;
  }

  async isPlatformSelectorVisible() {
    return (await this.#platformSelector()) !== null;
  }

  async isConfigurationVisible() {
    return (await this.#configuration()) !== null;
  }

  async isEditCardVisible() {
    return (await this.#editCard()) !== null;
  }

  async clickEditConfigurationButton() {
    const button = await this.#editConfigurationButton();
    if (!button) {
      throw new Error('Edit configuration button not found');
    }
    await button.click();
  }
}