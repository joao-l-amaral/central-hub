export interface Card {
  localId: string;
  name: string;
  image: string;
  rarity: string;
  description: string;
  illustrator: string;
  types: string[];
  hasHolo: boolean;
  hasNormal: boolean;
  hasReverse: boolean;
  setId: string;
  variant: string;
  index: number;
}

export type BinderCard = Card & { isPlaceholder: boolean }
