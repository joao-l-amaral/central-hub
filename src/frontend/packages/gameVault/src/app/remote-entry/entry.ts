import { Component } from '@angular/core';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome],
  selector: 'ng-mf-gameVault-entry',
  template: `<ng-mf-nx-welcome2></ng-mf-nx-welcome2>`,
})
export class RemoteEntry {}
