import { inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import {I18nService} from '../services';

export const MF_FRONTEND = new InjectionToken<string>('MF_FRONTEND');

@Pipe({
    name: 'translate',
    standalone: true
})
export class InternalizationPipe implements PipeTransform {

    private readonly i18nService = inject(I18nService);
    private readonly mf = inject(MF_FRONTEND);

    transform(value: string) {
        return this.i18nService.translate(this.mf, value);
    }
}
