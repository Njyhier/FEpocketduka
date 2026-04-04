export interface IInventory {
  id?: string;
  product_id?: string;
  quantity: number | null;
  reserved_quantity: number | null;
  location?: string;
  cost_price?: number | null;
  selling_price?: number | null;
}
