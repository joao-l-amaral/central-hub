import {Injectable, signal} from '@angular/core';
import { DictionaryType } from '../interfaces';

@Injectable()
export class ApplicationConfigurations {
    readonly basicAuthenticationToken = signal<string>('');
    readonly i18nDictionary = signal<DictionaryType[]>([]);
}
