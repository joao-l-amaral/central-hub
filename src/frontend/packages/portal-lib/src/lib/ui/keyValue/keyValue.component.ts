import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'lib-key-value',
    templateUrl: './keyValue.component.html',
    styleUrls: ['./keyValue.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeyValueComponent {
    readonly key = input.required<string>();
    readonly subKey = input<string>("");
    readonly value = input.required<string>();
    readonly keyValueColArea = input("12");
    readonly clazz = input("");
}
