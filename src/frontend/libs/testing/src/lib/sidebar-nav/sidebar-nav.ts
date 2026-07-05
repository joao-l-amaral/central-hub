import {ComponentHarness} from "@angular/cdk/testing";

export class SidebarNavHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-nav-panel';

  readonly #haveOptions = this.locatorForAll('.sidenav .nav li');

  async haveSideBarNavOptions() {
    const haveOptions = await this.#haveOptions();
    return haveOptions.length > 0;
  }
}
