import {computed, Directive, input, output} from '@angular/core';
import { TRow } from '../data-table.types';

@Directive({
  selector: '[libDataRowSelection]',
  host: {
    '(click)': 'onClick()',
    '[class.dt-active]': 'isRowSelected()',
    '[class.dt-active-multi-selected]': 'this.row()?.selected',
  },
})
export class DtRowSelectionDirective {
  readonly row = input.required<TRow>();
  readonly selectedRow = input<TRow>();
  readonly rowClicked = output<TRow>();
  readonly isRowSelected = computed(() => {
    return this.row().id === this.selectedRow()?.id || this.row()?.selected;
  });

  onClick() {
    this.rowClicked.emit(this.row());
  }
}
