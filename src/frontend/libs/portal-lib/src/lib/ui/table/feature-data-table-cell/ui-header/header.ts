import {ChangeDetectionStrategy, Component, computed, input, output, signal} from '@angular/core';
import {SortCriterion, SortState} from "../../util-request";

@Component({
  selector: 'lib-table-dt-header',
  templateUrl: 'header.html',
  styleUrl: 'header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDtHeaderComponent {
  readonly field = input.required<string>();
  readonly key = input.required<string>();
  readonly sortColumnChanged = output<SortCriterion>();

  private readonly sortCycle: Record<string, SortState> = {
    NONE: { icon: 'bi bi-arrow-down-up', next: 'ASC' },
    ASC: { icon: 'bi bi-arrow-up', next: 'DESC' },
    DESC: { icon: 'bi bi-arrow-down', next: null },
  };

  readonly #currentState = signal<'NONE' | 'ASC' | 'DESC'>('NONE');

  readonly sortIcon = computed(() => this.sortCycle[this.#currentState()].icon);

  protected onSortClick(event: PointerEvent): void {
    event.stopPropagation();

    const next = this.sortCycle[this.#currentState()].next;
    this.#currentState.set(next === null ? 'NONE' : next);

    this.sortColumnChanged.emit({ field: this.key(), direction: next });
  }
}
