import { IImage } from './iimage';
import { IInventory } from './iinventory';

export interface IProduct {
  id?: string;
  name: string;
  price?: number;
  description: string;
  categoryId?: string;
  category_name: string;
  createdAt?: Date;
  updatedAt?: Date;
  images: IImage[];
  inventories?: IInventory[];
}
