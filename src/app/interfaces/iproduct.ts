import { IImage } from "./iimage";
import { IInventory } from "./iinventory";

export interface IProduct {
  id?: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  categoryName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  images?: IImage[];
  inventories?: IInventory[];
}
