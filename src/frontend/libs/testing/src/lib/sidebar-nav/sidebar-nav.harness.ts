import {ComponentHarness} from "@angular/cdk/testing";

export class SidebarNavHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-nav-panel';

  readonly #haveOptions = this.locatorForAll('.sidenav .nav ul li');
  readonly #firstNavOption = this.locatorForOptional('.sidenav .nav ul li a');
  readonly #firstNavOptionArea = this.locatorForOptional('.sidenav .nav ul li');
  readonly #content = this.locatorFor('.content');

  async haveSideBarNavOptions() {
    const haveOptions = await this.#haveOptions();
    return haveOptions.length > 0;
  }

  async selectFirstNavOption() {
    const firstOption = await this.#firstNavOption();
    if (firstOption) {
      await firstOption.click();
    }
  }

  async getSelectedFirstNavOptionClass(): Promise<boolean> {
    const firstOption = await this.#firstNavOptionArea();
    if (!firstOption) return false;
    return await firstOption.hasClass('active-link');
  }

  async getContent() {
    return this.#content();
  }
}
