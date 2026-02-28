export type OptionCategory = 'front-saltos' | 'back-saltos' | 'other';

export interface Option {
  id: number;
  label: string;
  value: number;
  category: OptionCategory;
}

export interface OptionGroup {
  category: OptionCategory;
  label: string;
  options: Option[];
}
