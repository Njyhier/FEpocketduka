import { Component, inject, OnDestroy, signal } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { concatMap, forkJoin, of } from 'rxjs';

import { IProduct } from '../../../../../interfaces/iproduct';
import { IInventory } from '../../../../../interfaces/iinventory';
import { IApiresponse } from '../../../../../interfaces/iapiresponse';

import { ProductService } from '../../../../../services/product/product-service';
import { InventoryService } from '../../../../../services/inventory/inventory-service';
import { ProductImageService } from '../../../../../services/image/productImage/product-image-service';

@Component({
  selector: 'app-add-product-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent implements OnDestroy {
  productService = inject(ProductService);
  inventoryService = inject(InventoryService);
  productImageService = inject(ProductImageService);

  /**
   * The actual image files selected by the user.
   */
  selectedImages: File[] = [];

  /**
   * Preview URLs displayed in the UI.
   */
  imagePreviews = signal<string[]>([]);

  /**
   * Product form.
   */
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

  /**
   * Handles image selection.
   */
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    // Remove previous preview URLs
    this.clearImagePreviews();

    // Store selected files
    this.selectedImages = files;

    // Store files inside the form
    this.productForm.get('images')?.setValue([...this.selectedImages]);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));

    this.imagePreviews.set(previews);

    console.log('Selected images:', this.selectedImages);
  }

  /**
   * Deletes one selected image.
   */
  removeImage(index: number): void {
    if (index < 0 || index >= this.selectedImages.length) {
      return;
    }

    // Revoke the preview URL
    const previews = this.imagePreviews();

    if (previews[index]) {
      URL.revokeObjectURL(previews[index]);
    }

    // Remove the selected file
    this.selectedImages.splice(index, 1);

    // Remove the preview
    const updatedPreviews = previews.filter((_, imageIndex) => imageIndex !== index);

    this.imagePreviews.set(updatedPreviews);

    // Update form value
    this.productForm.get('images')?.setValue([...this.selectedImages]);

    console.log('Remaining images:', this.selectedImages);
  }

  /**
   * Clears all image previews.
   */
  private clearImagePreviews(): void {
    this.imagePreviews().forEach((url) => {
      URL.revokeObjectURL(url);
    });

    this.imagePreviews.set([]);
  }

  /**
   * Creates the product.
   */
  createProduct(): void {
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
          const productId = response?.payload ?? '';

          /**
           * Get selected images.
           */
          const images = this.productForm.value.images ?? [];

          /**
           * Upload images if any were selected.
           */
          const imageObservables =
            images.length > 0
              ? forkJoin(
                  images.map((image) =>
                    this.productImageService.uploadProductImage(productId, image),
                  ),
                )
              : of([]);

          /**
           * Inventory values.
           */
          const { quantity, reservedQuantity, costPrice, sellingPrice } =
            this.productForm.value.inventory ?? {};

          const inventory: IInventory = {
            product_id: productId,

            reserved_quantity: reservedQuantity ?? null,

            quantity: quantity ?? null,

            cost_price: costPrice ?? null,

            selling_price: sellingPrice ?? null,
          };

          /**
           * Create inventory.
           */
          const inventoryObservable = this.inventoryService.createInventory(inventory);

          /**
           * Run inventory creation and
           * image uploads together.
           */
          return forkJoin({
            product: of(response),

            inventory: inventoryObservable,

            images: imageObservables,
          });
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('Product created successfully:', response);

          // Clear previews
          this.clearImagePreviews();

          // Clear selected files
          this.selectedImages = [];

          // Reset form
          this.productForm.reset();

          // Reset images control
          this.productForm.get('images')?.setValue([]);
        },

        error: (error) => {
          console.error('Error creating product:', error);
        },
      });
  }

  /**
   * Called when the form is submitted.
   */
  onCreateProduct(): void {
    this.createProduct();
  }

  /**
   * Clean up object URLs when component
   * is destroyed.
   */
  ngOnDestroy(): void {
    this.clearImagePreviews();
  }
}
