import { Box } from './box.model';

export interface SelectionState {
  boxes: Box[];
  activeBoxId: number;
}
