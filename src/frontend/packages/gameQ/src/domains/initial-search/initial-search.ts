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
import {Platform} from "./util-configuration/configuration-interface";

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
  ],
})
export class InitialSearchComponent {
  showError = false;
  readonly #gameQConfigurationState = inject(GameQConfigurationState);

  readonly platforms = computed(() =>
    this.#gameQConfigurationState.platforms(),
  );

  protected onConfigurationSelect() {
    alert('navegar para a pagina de navegação');
  }

  protected onPlatformSelect(platform: Platform) {
    alert(`Selecionou a plataforma: ${platform.platformName}`);
  }

  protected onSearchAll() {
    alert(
      'navegar para a pagina da tabela que irá apresentar todos os jogos disponiveis',
    );
  }

  protected onSearchGame($event: string) {
    alert($event);
    this.showError = !this.showError;
  }
}
