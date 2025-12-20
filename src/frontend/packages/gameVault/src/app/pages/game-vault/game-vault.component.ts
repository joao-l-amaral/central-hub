import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from '../administration/administration.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'game-vault-home',
    templateUrl: './game-vault.component.html',
    styleUrl: './game-vault.component.scss',
    imports: [
        MatSlideToggle,
        ReactiveFormsModule,
        AdministrationComponent
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: []
})
export class GameVaultComponent implements OnDestroy {

    readonly slideForm= new FormControl(false);

    isAdministrator = signal(false);
    private readonly adminstratorSub: Subscription;

    constructor() {
        this.adminstratorSub = this.slideForm.valueChanges.subscribe(changes => {
            if(changes != null) {
                this.isAdministrator.set(changes);
            }
        })
    }

    ngOnDestroy(): void {
        this.adminstratorSub.unsubscribe();
    }


}
