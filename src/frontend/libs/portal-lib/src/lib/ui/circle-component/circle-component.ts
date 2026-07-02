import {ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
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
    readonly id = input.required<string>();
    readonly icon = input<string>();
    readonly label = input<string>();
    readonly selected = input<boolean>(false);
    readonly clicked = output<string>()

    readonly selectionStyle = computed(() => {
        return this.selected() ? 'selected' : 'unselected';
    });

    onAction() {
        if (this.selected()) {
            this.clicked.emit(this.id())
        }
    }
}
