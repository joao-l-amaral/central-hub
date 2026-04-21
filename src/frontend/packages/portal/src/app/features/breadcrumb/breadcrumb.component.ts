import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { BreadcrumbStateService } from './breadcrumb-state';
import { InternalizationPipe } from '@portal/library';

@Component({
    selector: 'portal-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
    imports: [
        InternalizationPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
    readonly #breadcrumbState = inject(BreadcrumbStateService);

    breadcrumbPath = this.#breadcrumbState.breadcrumbPath;

}
