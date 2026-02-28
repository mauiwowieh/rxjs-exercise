import { Option, OptionGroup } from '../../../core/models/option.model';

export const OPTIONS: Option[] = [
  { id: 1,  label: 'Front Tuck',         value: 2.3, category: 'front-saltos' },
  { id: 2,  label: 'Front Pike',         value: 3, category: 'front-saltos' },
  { id: 3,  label: 'Front Layout',       value: 4, category: 'front-saltos' },
  { id: 4,  label: 'Front Full Twist',   value: 5, category: 'front-saltos' },
  { id: 5,  label: 'Back Tuck',          value: 2, category: 'back-saltos' },
  { id: 6,  label: 'Back Pike',          value: 3, category: 'back-saltos' },
  { id: 7,  label: 'Back Layout',        value: 4, category: 'back-saltos' },
  { id: 8,  label: 'Back Full Twist',    value: 5, category: 'back-saltos' },
  { id: 9,  label: 'Roundoff',           value: 1.1, category: 'other' },
  { id: 10, label: 'Cartwheel',          value: 1, category: 'other' },
  { id: 11, label: 'Aerial Cartwheel',   value: 3, category: 'other' },
  { id: 12, label: 'Front Handspring',   value: 3, category: 'other' },
];

export const OPTION_GROUPS: OptionGroup[] = [
  {
    category: 'front-saltos',
    label: "Front Salto's",
    options: OPTIONS.filter(o => o.category === 'front-saltos'),
  },
  {
    category: 'back-saltos',
    label: "Back Salto's",
    options: OPTIONS.filter(o => o.category === 'back-saltos'),
  },
  {
    category: 'other',
    label: 'Other',
    options: OPTIONS.filter(o => o.category === 'other'),
  },
];
