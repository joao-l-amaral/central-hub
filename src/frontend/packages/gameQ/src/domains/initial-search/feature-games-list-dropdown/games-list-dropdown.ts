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
  SearchInputComponent,
} from '@central-hub/library';
import { GameQConfigurationState } from './util-configuration/configuration-state';
import { TooltipDirective } from 'ngx-smart-tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'gameq-initial-search',
  templateUrl: './initial-search.html',
  styleUrl: './initial-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CircleComponent,
    SearchInputComponent,
    InternalizationPipe,
    TooltipDirective,
    AlertComponent,
    RouterLink,
  ],
})
export class InitialSearchComponent {
  showError = false;
  readonly #gameQConfigurationState = inject(GameQConfigurationState);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);

  readonly platforms = computed(() =>
    this.#gameQConfigurationState.platforms(),
  );

  protected onConfigurationSelect() {
    alert('navegar para a pagina de navegação');
  }

  protected onSearchGame($event: string) {
    this.#router.navigate(['dashboard'], { relativeTo: this.#route });
    console.log($event);
    // this.showError = !this.showError;
  }
}
