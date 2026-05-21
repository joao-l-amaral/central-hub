import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'lib-circle-component',
    templateUrl: './circle-component.html',
    styleUrls: ['./circle-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class CircleComponent {
    readonly id = input.required<string>();
    readonly icon = input<string>();
    readonly label = input<string>();
    readonly selected = input.required<boolean>();
    readonly clicked = output<string>()

    readonly selectionStyle = computed(() => {
        return this.selected() ? 'selected' : 'unselected';
    });

    onAction() {
        if (this.selected()) {
            this.clicked.emit(this.id())
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.onAction();
        }
    }
}
