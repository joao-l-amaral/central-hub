import {ComponentHarness} from "@angular/cdk/testing";

export class AlertComponentHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-alert-component';

  readonly #subtitle = this.locatorForOptional('.has-subtitle');
  readonly #dismissButton = this.locatorForOptional('.ch-btn__tertiary');

  async haveSubtitle() {
    const subtitle = await this.#subtitle();
    return subtitle ? subtitle.text() : "";
  }

  async clickDismissButton() {
    const dismissButton = await this.#dismissButton();
    if (dismissButton) {
      await dismissButton.click();
    }
  }
}
