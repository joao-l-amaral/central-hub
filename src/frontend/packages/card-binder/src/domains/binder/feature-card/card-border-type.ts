export type CardBorderType = 'Base' | 'Reverse' | 'Holo' | 'EX' | 'Legendary';

export const CARD_BORDER_COLORS: Record<CardBorderType, { primary: string; shadow: string; shadowInner: string }> = {
  'Base':      { primary: 'rgba(200,200,205,0.75)',  shadow: 'rgba(200,200,205,0.35)', shadowInner: 'rgba(200,200,205,0.15)' },
  'Reverse':   { primary: 'rgba(0,204,0,0.75)',      shadow: 'rgba(0,204,0,0.35)',     shadowInner: 'rgba(0,204,0,0.15)' },
  'Holo':      { primary: 'rgba(0,136,255,0.75)',    shadow: 'rgba(0,136,255,0.35)',   shadowInner: 'rgba(0,136,255,0.15)' },
  'EX':        { primary: 'rgba(163,53,238,0.75)',   shadow: 'rgba(163,53,238,0.35)',  shadowInner: 'rgba(163,53,238,0.15)' },
  'Legendary': { primary: 'rgba(255,140,0,0.75)',    shadow: 'rgba(255,140,0,0.35)',   shadowInner: 'rgba(255,140,0,0.15)' },
};

export const CARD_GRADIENT_COLORS: Record<CardBorderType, [string,string,string,string,string,string]> = {
  'Base':      ['','','','','',''],
  'Reverse':   ['#005500','#00cc00','#00cc00','#66ff66','#ccffcc','#33ff33'],
  'Holo':      ['#0044aa','#0088ff','#0088ff','#66bbff','#ccf0ff','#00bbff'],
  'EX':        ['#612093','#a335ee','#a335ee','#dfabff','#fff1ff','#c56dff'],
  'Legendary': ['#b35900','#ff8c00','#ff8c00','#ffaa33','#ffddaa','#ff6600'],
};
