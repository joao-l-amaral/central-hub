import {ComponentHarness} from "@angular/cdk/testing";

export class ButtonHarness extends ComponentHarness {
  static readonly hostSelector = 'button[chButton]';

  readonly #isLoading = this.locatorForOptional('.ch-loader__sm');
  readonly #icon = this.locatorForOptional('.ch-btn__icon i');
  readonly #label = this.locatorForOptional('.ch-btn__label');

  async isLoading() {
    return (await this.#isLoading() !== null);
  }

  async haveIcon() {
    return (await this.#icon() !== null);
  }

  async getLabelText() {
    const label = await this.#label();
    return (label) ? label.text() : "";
  }
}
