import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'lib-table-dt-header',
  templateUrl: 'header.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDtHeaderComponent {
  readonly value = input.required<string>();
}
