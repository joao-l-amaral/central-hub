import { ComponentRef, Directive, effect, ElementRef, inject, input, Renderer2, ViewContainerRef } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";


@Directive({
    selector: '[lib-custom-button]',
    standalone: true
})
export class LibCustomButtonDirective {
    
    label = input.required<string>();
    isLoading = input.required<boolean>();
    icon = input<string>('');

    private readonly matButton = inject(MatButton);
    private readonly rendered = inject(Renderer2);
    private readonly el = inject(ElementRef);
    private readonly viewContainerRef = inject(ViewContainerRef);

    private spinnerInstance: ComponentRef<MatProgressSpinner> | null = null;

    constructor() {
        effect(() => {
            if(this.isLoading()) {
                this.rendered.setProperty(this.el.nativeElement, 'textContent', '');
                this.matButton.disabled = true;
                this.addSpinner();
            } else {
                this.rendered.setProperty(this.el.nativeElement, 'textProperty', this.label());
                this.matButton.disabled = false;
                this.removeSpinner();
                this.loadIcon();
            }
        });
    }

    private loadIcon() {
        if(this.icon()) {
            const iconInstance = this.viewContainerRef.createComponent(MatIcon);
            iconInstance.setInput('fontIcon', this.icon());
            const iconEl = iconInstance.location.nativeElement;
            this.rendered.insertBefore(this.el.nativeElement, iconEl, this.el.nativeElement.firstChild);
        }
    }

    private addSpinner() {
        this.spinnerInstance = this.viewContainerRef.createComponent(MatProgressSpinner);
        const loadSpinner = this.spinnerInstance.instance;
        loadSpinner.diameter = 20;
        loadSpinner.strokeWidth = 2;
        loadSpinner.mode = 'indeterminate';

        const spinnerEl = this.spinnerInstance.location.nativeElement;
        this.rendered.appendChild(this.el.nativeElement, spinnerEl);
    }

    private removeSpinner() {
        if(this.spinnerInstance) {
            this.spinnerInstance.destroy();
            this.spinnerInstance = null;
        }
    }

}