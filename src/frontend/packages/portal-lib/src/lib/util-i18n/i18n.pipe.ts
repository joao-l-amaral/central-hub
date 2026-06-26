import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n-service';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class InternalizationPipe implements PipeTransform {
  private readonly i18nService = inject(I18nService);

  transform(value: string) {
    return this.i18nService.translate(value);
  }
}
