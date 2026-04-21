import {ChangeDetectionStrategy, Component} from '@angular/core';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome],
  selector: 'sample-sample-entry',
  template: `<sample-nx-welcome/>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoteEntry {}
