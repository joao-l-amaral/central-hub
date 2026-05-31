import {Injectable, signal} from '@angular/core';
import { DictionaryType } from '../interfaces';

@Injectable()
export class SharedApplicationConfigurations {
    readonly i18nDictionary = signal<DictionaryType[]>([]);
}
