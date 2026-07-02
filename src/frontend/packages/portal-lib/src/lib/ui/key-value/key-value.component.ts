import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'lib-key-value',
    templateUrl: './key-value.component.html',
    styleUrls: ['./key-value.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyValueComponent {
    readonly label = input.required<string>();
    readonly subLabel = input<string>("");
    readonly value = input.required<string>();
    readonly colArea = input("12");
    readonly clazz = input("");
}
