import { ICartItem } from './icart-item';

export interface ICart {
  id?: string;
  items?: ICartItem[];
  subtotal?: number;
  total_items?: number;
}
