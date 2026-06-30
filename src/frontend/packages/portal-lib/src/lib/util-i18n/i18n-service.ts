import { Injectable, signal } from '@angular/core';

@Injectable()
export class I18nService {
  readonly #i18n = signal<Map<string, string> | undefined>(undefined);



  merge(dictionary: Map<string, string>) {
    this.#i18n.update((prev) => {
      return prev ? new Map([...prev, ...dictionary]) : dictionary;
    });
  }

  translate(value: string, arg?: string) {
    const i18nData = this.#i18n();

    if (i18nData) {
      if (arg) {
        const translate = i18nData.get(value) ?? value;
        return translate.replace('%s', arg ?? '');
      }
      return i18nData.get(value) ?? value;
    }

    return value;
  }
}
