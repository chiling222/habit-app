export type PaletteColor = {
  key: string;
  bg: string;
  stamp: string;
  tab: string;
  today: string;
  soft: string;
};

export const PALETTE: PaletteColor[] = [
  { key: 'peach', bg: '#FBEEE9', stamp: '#DB8A70', tab: '#C56A4E', today: '#D89A85', soft: '#F7DACE' },
  { key: 'mint', bg: '#E9F1EE', stamp: '#7FB29E', tab: '#4E8C74', today: '#8FBCAB', soft: '#D7E7E0' },
  { key: 'lavender', bg: '#EFEBF5', stamp: '#A48FC6', tab: '#7A5EA0', today: '#B49FD4', soft: '#E1D9EF' },
  { key: 'butter', bg: '#FBF3E2', stamp: '#D3AB4F', tab: '#A9822B', today: '#E0C67E', soft: '#F1E3C4' },
  { key: 'blush', bg: '#FBEBEE', stamp: '#DB8AA0', tab: '#C15E7C', today: '#E3A6B6', soft: '#F5D6DE' },
  { key: 'sky', bg: '#E9EFF4', stamp: '#7FA4C2', tab: '#4E7A9C', today: '#8FB2CB', soft: '#D5E2ED' },
];

export const TXT = {
  strong: '#3D362F',
  p: '#5A524D',
  s: '#9A8F86',
  m: '#B3A69E',
  faint: '#CFC3BA',
};

export const TAB_COLORS = {
  habit: '#C56A4E',
  pocket: '#C15E7C',
  dream: '#7A5EA0',
  inactive: '#C4B7AB',
};

export const STAMP_ROTATIONS = [-7, 5, -4, 6, -6, 3, -5, 4, 7, -3];

// Huninn 字型只有 Regular 字重,iOS 對自訂字型不會自動模擬粗體,
// 用文字陰影疊字的方式讓文字視覺上看起來更粗、更有份量。
export function fakeBold(color: string) {
  return {
    color,
    textShadowColor: color,
    textShadowOffset: { width: 0.5, height: 0 },
    textShadowRadius: 0.6,
  } as const;
}
