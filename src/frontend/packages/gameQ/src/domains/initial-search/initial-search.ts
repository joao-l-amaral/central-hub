import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  AlertComponent,
  ButtonComponent,
  CircleComponent,
  InternalizationPipe,
} from '@central-hub/library';
import { GameQConfigurationState } from './util-configuration/configuration-state';
import { TooltipDirective } from 'ngx-smart-tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SearchComponent } from './feature-search/search';

@Component({
  selector: 'gameq-initial-search',
  templateUrl: './initial-search.html',
  styleUrl: './initial-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CircleComponent,
    InternalizationPipe,
    TooltipDirective,
    AlertComponent,
    RouterLink,
    SearchComponent,
  ],
})
export class InitialSearchComponent {
  readonly #gameQConfigurationState = inject(GameQConfigurationState);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  showError = false;

  readonly platforms = computed(() =>
    this.#gameQConfigurationState.platforms(),
  );

  protected onConfigurationSelect() {
    this.#router.navigate(['administration'], {
      relativeTo: this.#route,
    });
  }
}
