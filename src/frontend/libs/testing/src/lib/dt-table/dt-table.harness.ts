import {ComponentHarness} from "@angular/cdk/testing";

export class DtTableHarness extends ComponentHarness {
  static readonly hostSelector = 'lib-table-dt';

  readonly #emptyDataRow = this.locatorForOptional('.dt-no-data');
  readonly #removeButton = this.locatorForOptional('.table-responsive button');
  readonly #selectAllRowsToRemoveInput = this.locatorForOptional('.table-responsive .form-check-input');
  readonly #selectRowToRemoveInput = this.locatorForOptional('.table-responsive .td-select-cell .form-check-input');
  readonly #selectFirstRowToRemoveInput = this.locatorForAll('.table-responsive .td-select-cell .form-check-input');
  readonly #tableRowsList = this.locatorForAll('.dt-table tbody tr');
  readonly #tableColumnHeaders = this.locatorForAll('th[scope="col"]');

  async isEmptyDataRowVisible() {
    return (await this.#emptyDataRow()) !== null;
  }

  async isRemoveButtonVisible() {
    return (await this.#removeButton()) !== null;
  }

  async isSelectAllRowsToRemoveInput() {
    return (await this.#selectAllRowsToRemoveInput()) !== null;
  }

  async isSelectRowToRemoveInput() {
    return (await this.#selectRowToRemoveInput()) !== null;
  }

  async selectAllRowsToRemoveInput() {
    const input = await this.#selectAllRowsToRemoveInput();
    if (!input) {
      throw new Error('Select-all-rows checkbox not found');
    }
    await input.click();
  }

  async selectSingleRowToRemove() {
    const input = await this.#selectFirstRowToRemoveInput();
    if (!input || input.length === 0) {
      throw new Error('Select-row checkbox not found');
    }
    await input[0].click();
  }

  async isSelectAllRowsToRemoveChecked() {
    const input = await this.#selectAllRowsToRemoveInput();
    if (!input) {
      throw new Error('Select-all-rows checkbox not found');
    }
    return input.getProperty<boolean>('checked');
  }

  async removeSelectedRow() {
    const removeRowsButton = await this.#removeButton();
    if (!removeRowsButton) {
      throw new Error('Remove rows button not found');
    }
    await removeRowsButton.click();
  }

  async getRowsLength() {
    const rows = await this.#tableRowsList();
    return rows.length;
  }

  async pressFirstRow() {
    const rows = await this.#tableRowsList();
    if(rows.length === 0) {
      throw new Error('Select-rows checkbox not found');
    }
    await rows[0].click();
  }

  async clickColumnHeader(columnIndex: number) {
    const headers = await this.#tableColumnHeaders();
    if(headers.length === 0 || columnIndex >= headers.length) {
      throw new Error(`Column header at index ${columnIndex} not found. Found ${headers.length} headers.`);
    }
    await headers[columnIndex].click();
  }

  async getColumnValues(columnIndex: number): Promise<string[]> {
    const rows = await this.#tableRowsList();
    const values: string[] = [];

    for (let i = 0; i < rows.length; i++) {
      const cells = await this.locatorForAll(`.dt-table tbody tr:nth-child(${i + 1}) td`)();
      if(columnIndex < cells.length) {
        const text = await cells[columnIndex].text();
        values.push(text.trim());
      }
    }

    return values;
  }

}
