import {ComponentHarness} from "@angular/cdk/testing";

export class KeyValueHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-key-value';

  readonly #subLevel = this.locatorForOptional('.element .element_label span');

  async isSubLevelVisible() {
    return (await this.#subLevel()) !== null;
  }
}
