import {ComponentHarness} from "@angular/cdk/testing";

export class NavbarHarness extends ComponentHarness {
  static readonly hostSelector = 'ch-nav-bar';

  readonly #loginButton = this.locatorForOptional('.nav-login');
  readonly #logoutButton = this.locatorForOptional('.nav-logout');
  readonly #logout = this.locatorForOptional('.nav-logout-text');

  async isLoginButtonVisible() {
    return (await this.#loginButton()) !== null;
  }

  async isLogoutButtonVisible() {
    return (await this.#logoutButton()) !== null;
  }

  async getLogoutText() {
    const logoutText = await this.#logout();
    return logoutText?.text() ?? "";
  }

  async clickLoginButton() {
    const loginButton = await this.#loginButton();
    if (loginButton) {
      await loginButton.click();
    }
  }

  async clickLogoutButton() {
    const logoutButton = await this.#logoutButton();
    if (logoutButton) {
      await logoutButton.click();
    }
  }
}
