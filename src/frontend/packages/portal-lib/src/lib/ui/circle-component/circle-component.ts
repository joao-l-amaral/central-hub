import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'lib-circle-component',
    templateUrl: './circle-component.html',
    styleUrls: ['./circle-component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class CircleComponent {
    readonly icon = input<string>();
    readonly label = input<string>();
    readonly selected = input.required<boolean>();
    readonly onAction = input<() => void>();

    readonly selectionStyle = computed(() => {
        return this.selected() ? 'selected' : 'unselected';
    });

    action() {
        const actionFn = this.onAction();
        if (this.selected() && actionFn) {
            actionFn()
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.action();
        }
    }
}
