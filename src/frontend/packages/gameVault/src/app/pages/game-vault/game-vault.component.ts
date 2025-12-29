import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from '../administration/administration.component';
import { Subscription } from 'rxjs';
import { I18nService, InternalizationPipe, MF_FRONTEND } from '@portal/library';

@Component({
    selector: 'game-vault-home',
    templateUrl: './game-vault.component.html',
    styleUrl: './game-vault.component.scss',
    imports: [
        MatSlideToggle,
        ReactiveFormsModule,
        AdministrationComponent,
        InternalizationPipe
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: MF_FRONTEND, useValue: 'gameVault' }
    ]
})
export class GameVaultComponent implements OnDestroy {

    private readonly I18nService = inject(I18nService);
    private readonly mf = inject(MF_FRONTEND);

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
