import { Injectable, signal } from '@angular/core';

@Injectable()
export class I18nService {
  readonly #i18n = signal<Map<string, string> | undefined>(undefined);

  get i18n() {
    return this.#i18n();
  }

  merge(dictionary: Map<string, string>) {
    this.#i18n.update((prev) => {
      return prev ? new Map([...prev, ...dictionary]) : dictionary;
    });
  }

  translate(value: string, ...arg: string[]) {
    const i18nData = this.#i18n();

    if (i18nData) {
      const translate = i18nData.get(value) ?? value;

      if (arg && arg.length > 0) {
        let result = translate;
        for (const a of arg) {
          result = result.replace('%s', a ?? '');
        }
        return result;
      }

      return translate;
    }

    return value;
  }
}
