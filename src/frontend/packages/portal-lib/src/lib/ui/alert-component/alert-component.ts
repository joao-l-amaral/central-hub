import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import {LibCustomButtonDirective} from "../../directives";
import {MatButton} from "@angular/material/button";

@Component({
    selector: 'lib-alert-component',
    templateUrl: './alert-component.html',
    styleUrls: ['./alert-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, LibCustomButtonDirective, MatButton],
})
export class AlertComponent {
    readonly status = input.required<'info' | 'warning' | 'danger'>();
    readonly title = input.required();
    readonly subtitle = input('');
    readonly dismissible = input(false);
    readonly visible = input(true);
    readonly visibleChange = output<boolean>();

    readonly icon = computed(() => {
        let icon = '';

        switch (this.status()) {
            case 'warning':
                icon = 'bi bi-exclamation-triangle';
                break;
            case 'danger':
                icon = 'bi bi-x-circle';
                break;
            default:
                icon = 'bi bi-info-circle';
        }

        return icon;
    });

    onClose() {
        this.visibleChange.emit(true);
    }
}

// TODO:
// Adicionar os testes unitarios
