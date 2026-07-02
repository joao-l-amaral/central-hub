import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  signal,
} from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from '../administration/administration.component';
import { Subscription } from 'rxjs';
import { InternalizationPipe } from '@central-hub/library';

@Component({
  selector: 'gameq-vault-home',
  templateUrl: './gameq.component.html',
  styleUrl: './gameq.component.scss',
  imports: [
    MatSlideToggle,
    ReactiveFormsModule,
    AdministrationComponent,
    InternalizationPipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameQComponent implements OnDestroy {
  readonly slideForm = new FormControl(false);

  readonly isAdministrator = signal(false);
  readonly #adminstratorSub: Subscription;

  constructor() {
    this.#adminstratorSub = this.slideForm.valueChanges.subscribe((changes) => {
      if (changes !== null) {
        this.isAdministrator.set(changes);
      }
    });
  }

  ngOnDestroy(): void {
    this.#adminstratorSub.unsubscribe();
  }
}
