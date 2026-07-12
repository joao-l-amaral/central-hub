import {computed, Directive, input, output} from '@angular/core';

@Directive({
  selector: '[dataRowSelection]',
  host: {
    '(click)': 'onClick($event)',
    '[class.table-active]': 'isRowSelected()'
  }
})
export class DtRowSelectionDirective<T> {

  readonly row = input.required<T>();
  readonly selectedRow = input<T>();
  readonly rowClicked = output<T>();

  readonly isRowSelected = computed(() => this.row() === this.selectedRow());

  onClick(event: MouseEvent) {
    this.rowClicked.emit(this.row());
  }

}
