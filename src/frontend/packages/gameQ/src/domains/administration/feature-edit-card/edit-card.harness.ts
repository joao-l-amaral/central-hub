import { ComponentHarness } from '@angular/cdk/testing';

export class EditCardHarness extends ComponentHarness {
  static readonly hostSelector = 'gameq-administration-edit-card';

  readonly #formatButton = this.locatorForOptional(
    '.administration-configuration__action button.ch-btn__tertiary',
  );
  readonly #cancelButton = this.locatorForOptional(
    '.administration-configuration__action button.ch-btn__secondary',
  );
  readonly #saveButton = this.locatorForOptional(
    '.administration-configuration__action button.ch-btn__primary',
  );
  readonly #textarea = this.locatorForOptional('textarea');
  readonly #errorMessage = this.locatorForOptional('.json-error');
  readonly #errorLines = this.locatorForAll('.line-number.error-line');

  async clickFormat() {
    const button = await this.#formatButton();
    if (!button) {
      throw new Error('Format button not found');
    }
    await button.click();
  }

  async clickCancel() {
    const button = await this.#cancelButton();
    if (!button) {
      throw new Error('Cancel button not found');
    }
    await button.click();
  }

  async clickSave() {
    const button = await this.#saveButton();
    if (!button) {
      throw new Error('Save button not found');
    }
    await button.click();
  }

  async getTextAreaValue() {
    const textarea = await this.#textarea();
    if (!textarea) {
      throw new Error('Textarea not found');
    }
    return (await textarea.getProperty<string>('value')) ?? '';
  }

  async setTextAreaValue(value: string): Promise<void> {
    const textarea = await this.#textarea();

    if (!textarea) {
      throw new Error('Textarea not found');
    }

    await textarea.setInputValue(value);
    await textarea.dispatchEvent('input');
    await textarea.dispatchEvent('change');
  }

  async isErrorVisible() {
    return (await this.#errorMessage()) !== null;
  }

  async getErrorMessage() {
    const error = await this.#errorMessage();
    return error ? await error.text() : '';
  }

  async getHighlightedErrorLinesCount() {
    return (await this.#errorLines()).length;
  }
}
