import {ComponentHarness} from "@angular/cdk/testing";

export class ConfirmationModalHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-confirmation-modal-component';

  readonly #cancelButton = this.locatorFor('.ch-btn__secondary');

  async clickCancelButton() {
    const cancelButton = await this.#cancelButton();
    if (cancelButton) {
      await cancelButton.click();
    }
  }

}
