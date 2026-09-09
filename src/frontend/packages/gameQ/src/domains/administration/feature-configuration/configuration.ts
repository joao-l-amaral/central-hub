import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  CollapsableComponent,
  InternalizationPipe,
  KeyValueComponent,
} from '@central-hub/library';
import { Configurations } from '../../../models/configurations-interface';

@Component({
  selector: 'gameq-configuration-administration',
  templateUrl: './configuration.html',
  styleUrl: './configuration.scss',
  imports: [CollapsableComponent, InternalizationPipe, KeyValueComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Configuration {
  readonly configuration = input.required<Configurations>();

  readonly platforms = computed(() => this.configuration()?.platforms || []);
}
