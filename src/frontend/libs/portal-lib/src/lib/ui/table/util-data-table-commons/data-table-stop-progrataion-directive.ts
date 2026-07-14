import { Directive } from '@angular/core';

@Directive({
  selector: '[stopPropagation]',
  host: {
    '(click)': 'onClick($event)'
  }
})
export class StopPropagationDirective {
  onClick(event: Event) {
    event.stopPropagation();
  }
}
