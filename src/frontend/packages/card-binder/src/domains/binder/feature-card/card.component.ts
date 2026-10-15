import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CARD_BORDER_COLORS,
  CARD_GRADIENT_COLORS,
  CardBorderType,
} from './card-border-type';
import { BinderState } from '../util-binder-data/binder-state';
import { BinderCard } from '../util-binder-data/card-interface';

@Component({
  selector: 'cb-pokemon-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class CardComponent implements OnInit {
  readonly #binderState = inject(BinderState);
  readonly #el = inject(ElementRef<HTMLElement>);
  readonly #destroyRef = inject(DestroyRef);

  readonly cardIndex = input.required<number>();

  readonly visible = signal(false);

  readonly #placeholderCard = (cardIndex: number) => {
    return {
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${cardIndex}.png`,
      isPlaceholder: true,
    } as BinderCard;
  };

  readonly card = computed(() => {
    const cardIndex = this.cardIndex();
    return (this.#binderState.getCardByIndex(cardIndex) ??
      this.#placeholderCard(cardIndex)) as BinderCard;
  });

  readonly gradientColors = computed(() => {
    const cardVariant = this.card().variant as CardBorderType;
    return CARD_GRADIENT_COLORS[cardVariant] ?? CARD_GRADIENT_COLORS['Base'];
  });

  readonly shadowColors = computed(() => {
    const cardVariant = this.card().variant as CardBorderType;
    const c = CARD_BORDER_COLORS[cardVariant] ?? CARD_BORDER_COLORS['Base'];
    return { primary: c.primary, shadow: c.shadow, inner: c.shadowInner };
  });

  ngOnInit() {
    const io = new IntersectionObserver(([e]) =>
      this.visible.set(e.isIntersecting),
    );
    io.observe(this.#el.nativeElement);
    this.#destroyRef.onDestroy(() => io.disconnect());
  }
}
