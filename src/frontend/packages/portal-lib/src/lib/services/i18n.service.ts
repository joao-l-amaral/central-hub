import {inject, Injectable} from "@angular/core";
import { SharedApplicationConfigurations } from './application-configurations.service';

@Injectable({
    providedIn: 'root'
})
export class I18nService {

    readonly #sharedApplicationConfigurations = inject(SharedApplicationConfigurations);

    readonly #i18n = this.#sharedApplicationConfigurations.i18nDictionary;

    addMap(dictionary: Map<string, string>, namespace: string) {

        const i18nData = [...this.#i18n()];

        namespace = (namespace.length > 0) ? namespace : 'portal';

        const namespaceDictionary = {
          namespace: namespace,
          dictionary: dictionary
        };

        i18nData.push(namespaceDictionary);

        this.#i18n.set(i18nData);
    }

    translate(namespace: string | null, value: string, arg?: string) {

        const i18nData = this.#i18n().find(item => item.namespace === namespace);

        if (i18nData && i18nData.namespace === namespace) {
          if(arg) {
            const translate = i18nData.dictionary.get(value) ?? value;
            return translate.replace('%s', arg ?? '');
          }
          return i18nData.dictionary.get(value) ?? value;
        }

        return value
    }

}
