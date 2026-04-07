import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IProduct } from '../../../../../interfaces/iproduct';
import { ProductService } from '../../../../../services/product/product-service';
import { concatMap, forkJoin, of } from 'rxjs';
import { InventoryService } from '../../../../../services/inventory/inventory-service';
import { IInventory } from '../../../../../interfaces/iinventory';
import { ProductImageService } from '../../../../../services/image/productImage/product-image-service';
import { IApiresponse } from '../../../../../interfaces/iapiresponse';

@Component({
  selector: 'app-add-product-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent {
  productService = inject(ProductService);
  inventoryService = inject(InventoryService);
  productImageService = inject(ProductImageService);

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    brand: new FormControl(''),
    images: new FormControl<File[]>([]),
    inventory: new FormGroup({
      quantity: new FormControl<number | null>(null),
      reservedQuantity: new FormControl<number | null>(null),
      costPrice: new FormControl<number | null>(null),
      sellingPrice: new FormControl<number | null>(null),
    }),
  });
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const files = Array.from(input.files);
    this.productForm.get('images')?.setValue(files);
  }
  createProduct() {
    const name = this.productForm.value.productName ?? '';
    const description = this.productForm.value.description ?? '';
    const category = this.productForm.value.category ?? '';

    const product: IProduct = {
      name: name,
      category_name: category,
      description: description,
      images: [],
      inventories: [],
    };
    this.productService
      .createProduct(product)
      ?.pipe(
        concatMap((response: IApiresponse<string>) => {
          const id = response?.payload ?? '';
          const images = this.productForm.value?.images ?? [];
          const imgObs =
            images && images.length
              ? forkJoin(images?.map((img) => this.productImageService.uploadProductImage(id, img)))
              : of([]);
          const { quantity, reservedQuantity, costPrice, sellingPrice } =
            this.productForm.value.inventory ?? {};
          const inventory: IInventory = {
            product_id: id,
            reserved_quantity: reservedQuantity ?? null,
            quantity: quantity ?? null,
            cost_price: costPrice ?? null,
            selling_price: sellingPrice ?? null,
          };
          const inventoryObs = this.inventoryService.createInventory(inventory);
          return forkJoin({
            product: of(response),
            inventory: inventoryObs,
            image: imgObs,
          });
        }),
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.productForm.reset();
        },
        error: (e) => {
          console.log('Error!', e);
        },
      });
  }

  onCreateProduct() {
    this.createProduct();
  }
}
