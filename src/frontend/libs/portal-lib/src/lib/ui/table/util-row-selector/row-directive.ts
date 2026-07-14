import {computed, Directive, input, output} from '@angular/core';

@Directive({
  selector: '[dataRowSelection]',
  host: {
    '(click)': 'onClick()',
    '[class.table-active]': 'isRowSelected()'
  }
})
export class DtRowSelectionDirective<T extends {id?: number}> {

  readonly row = input.required<T>();
  readonly selectedRow = input<T | undefined>();
  readonly rowClicked = output<T>();

  readonly isRowSelected = computed(() => this.row().id === this.selectedRow()?.id);

  onClick() {
    this.rowClicked.emit(this.row());
  }

}
