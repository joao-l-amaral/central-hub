import {ComponentHarness} from "@angular/cdk/testing";

export class CircleComponentHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-circle-component';

  readonly #label = this.locatorForOptional('.circle-container span');

  async isLabelVisible() {
    return (await this.#label() !== null);
  }

}
