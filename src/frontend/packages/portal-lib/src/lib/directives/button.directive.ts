import { ComponentRef, Directive, effect, ElementRef, inject, input, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
    selector: '[lib-custom-button]',
    standalone: true,
    host: {
        'class': 'mdc-button mat-mdc-button-base mat-primary'
    }
})
export class LibCustomButtonDirective implements OnInit {

    title = input<string>("");
    label = input<string>("");
    isLoading = input<boolean>(false);
    icon = input<string>("");
    type = input.required<'primary' | 'secondary' | 'text'>();

    private readonly matButton = inject(MatButton, { optional: true, host: true });

    private readonly renderer = inject(Renderer2);
    private readonly el = inject(ElementRef);
    private readonly vcr = inject(ViewContainerRef);
    private spinnerInstance: ComponentRef<MatProgressSpinner> | null = null;

    private button: MatButton;

    constructor() {

        if (!this.matButton) {
            throw new Error('appCustomButton directive requires mat-button directive on the same element');
        }

        this.button = this.matButton;

        effect(() => {
            if(this.isLoading()) {
                this.renderer.setProperty(this.el.nativeElement, 'textContent', '');
                this.button.disabled = true;
                this.addSpinner();
            } else {
                this.renderer.setProperty(this.el.nativeElement, 'textContent', this.label());
                this.button.disabled = false;
                this.removeSpinner();
                this.loadIcon();
            }
        })
    }

    ngOnInit(): void {

        this.renderer.setProperty(this.el.nativeElement, 'title', this.title());

        switch (this.type()) {
            case 'primary':
                this.button.setAppearance('filled');
                break;
            case 'secondary':
                this.button.setAppearance('outlined');
                break;
            default:
                this.button.setAppearance('text');
                break;
        }
    }

    private loadIcon() {
        if (this.icon()) {
            const iconInstance = this.vcr.createComponent(MatIcon);
            iconInstance.setInput('fontIcon', this.icon());
            const iconEl = iconInstance.location.nativeElement;
            this.renderer.insertBefore(this.el.nativeElement, iconEl, this.el.nativeElement.firstChild);
        }
    }

    private addSpinner() {
        this.spinnerInstance = this.vcr.createComponent(MatProgressSpinner);
        const loadingSpinner = this.spinnerInstance.instance;
        loadingSpinner.diameter = 20;
        loadingSpinner.strokeWidth = 2;
        loadingSpinner.mode = 'indeterminate';

        const spinnerEl = this.spinnerInstance.location.nativeElement;
        this.renderer.appendChild(this.el.nativeElement, spinnerEl);
    }

    private removeSpinner() {
        if (this.spinnerInstance) {
            this.spinnerInstance.destroy();
            this.spinnerInstance = null;
        }
    }
}
