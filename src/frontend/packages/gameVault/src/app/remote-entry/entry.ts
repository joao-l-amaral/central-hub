import {ChangeDetectionStrategy, Component} from '@angular/core';
import { GameVaultComponent } from '../pages/game-vault/game-vault.component';

@Component({
    imports: [GameVaultComponent],
    selector: 'gameq-game-vault-entry',
    template: `<gameq-vault-home/>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoteEntry {}
