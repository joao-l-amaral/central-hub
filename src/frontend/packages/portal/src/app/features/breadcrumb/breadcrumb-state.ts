import { Injectable, signal } from '@angular/core';

@Injectable()
export class BreadcrumbStateService {
    breadcrumbPath = signal<string[]>([]);

    addPath(url: string) {
        const paths = url.split('/');
        const pathsFiltered = paths.filter(x => x !== '');
        this.breadcrumbPath.set(pathsFiltered);
    }
}
