import { Directive } from '@angular/core';

@Directive({
  selector: '[libStopPropagation]',
  host: {
    '(click)': 'onClick($event)'
  }
})
export class StopPropagationDirective {
  onClick(event: Event) {
    event.stopPropagation();
  }
}
