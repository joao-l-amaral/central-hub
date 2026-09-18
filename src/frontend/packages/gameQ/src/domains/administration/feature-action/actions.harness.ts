import { ComponentHarness } from '@angular/cdk/testing';
import { ButtonHarness } from '@central-hub/testing';

export class ActionsHarness extends ComponentHarness {
  static readonly hostSelector = 'gameq-actions-administration';

  readonly #forceUpdateButton = this.locatorFor(ButtonHarness);

  async hasForceUpdateButton() {
    return !!(await this.locatorForOptional(ButtonHarness)());
  }

  async clickForceUpdate() {
    const button = await this.#forceUpdateButton();
    await (await button.host()).click();
  }

  async isForceUpdateLoading() {
    return (await this.#forceUpdateButton()).isLoading();
  }
}