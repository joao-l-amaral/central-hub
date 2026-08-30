import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AccordionContent, AccordionGroup, AccordionPanel, AccordionTrigger } from '@angular/aria/accordion';
import { InternalizationPipe } from '../../util-i18n';

@Component({
  selector: 'lib-collapsable',
  templateUrl: './collapsable.html',
  styleUrls: ['./collapsable.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AccordionContent,
    AccordionGroup,
    AccordionPanel,
    AccordionTrigger,
    InternalizationPipe,
  ],
})
export class CollapsableComponent {
  readonly title = input.required<string>();
  readonly isExpanded = input(true);
}
