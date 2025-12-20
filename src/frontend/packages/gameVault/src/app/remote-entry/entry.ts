import { Component } from '@angular/core';
import { GameVaultComponent } from '../pages/game-vault/game-vault.component';

@Component({
    imports: [GameVaultComponent],
  selector: 'ng-mf-gameVault-entry',
  template: `<game-vault-home></game-vault-home>`,
})
export class RemoteEntry {}
