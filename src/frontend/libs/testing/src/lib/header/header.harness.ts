import { ComponentHarness } from '@angular/cdk/testing';

export class HeaderHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-header';

  readonly #icon = this.locatorForOptional('.header .header__icon');
  readonly #subText = this.locatorForOptional('.header .header__text .subtitle');

  async isIconPresent() {
    return !!(await this.#icon());
  }

  async isSubtitlePresent() {
    return !!(await this.#subText());
  }
}
