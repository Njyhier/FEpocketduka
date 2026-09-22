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
  images: IImage[] | [];
  inventories: IInventory[] | [];
}

export type ListProductsParams = {
  skip?: number;
  limit?: number;
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  sort_by?: 'name' | 'price' | 'created_at' | 'id';
  sort_order?: 'asc' | 'desc';
};
