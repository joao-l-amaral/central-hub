import {ChangeDetectionStrategy, Component, effect, input, viewChild} from "@angular/core";
import {DtTemplateDirective} from "../util-data-table-commons/data-table-template-directive";

@Component({
  selector: 'lib-dt-col',
  templateUrl: 'data-table-col.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DtTemplateDirective
  ]
})
export class DataTableCol<RECORD> {
  readonly header = input.required<string>();
  readonly key = input.required<string>();
  readonly headerTemplate = viewChild.required(DtTemplateDirective<RECORD>)
  //readonly cellTemplate = contentChild(DtTemplateDirective<RECORD>);

  constructor() {
    effect(() => {
      console.log(this.header());
      console.log(this.key());
    });
  }

}
