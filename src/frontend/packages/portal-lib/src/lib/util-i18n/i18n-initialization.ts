import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { I18nService } from './i18n-service';
import { SessionStorage } from '../util-session-storage';

type MapEntry = Record<string, string>;

@Injectable()
export class I18nInitialization {
  readonly #i18n = inject(I18nService);
  readonly #httpClient = inject(HttpClient);
  readonly #sessionStorage = inject(SessionStorage);

  readonly remotes = this.#sessionStorage.getRemotes();

  readonly loadedRemoteDictionary = signal(0);

  readonly areAllDictionaryLoaded = computed(() => {
    const number = this.loadedRemoteDictionary();
    return this.remotes.length === number;
  })

  increaseNumberOfLoadedDictionary() {
    this.loadedRemoteDictionary.update((prev) => prev + 1);
  }

  private checkLanguage(language: string): string {
    return language === 'pt' || language === 'en' ? language : 'en';
  }

  private getLanguageDic(language: string, remote?: string) {
    const url = remote
      ? `./assets/${remote}/i18n/messages-${language}.json`
      : `./assets/i18n/messages-${language}.json`;
    return firstValueFrom(this.#httpClient.get<MapEntry>(url));
  }

  async fetchI18nData(remote?: string) {
    const language = this.checkLanguage(navigator.language);
    const data = await this.getLanguageDic(language, remote);
    const dictionary = new Map<string, string>();

    if (data) {
      Object.keys(data).forEach((key) => {
        dictionary.set(key, data[key]);
      });

      this.#i18n.addToDictionary(dictionary);
    }
  }
}
