import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product/product-service';
import { IProduct } from '../../../interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details-component',
  imports: [],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
})
export class ProductDetailsComponent implements OnInit {
  private productService = inject(ProductService);
  product = signal<IProduct | null>(null);
  private activatedRoute = inject(ActivatedRoute);
  private product_id = signal<string>('');

  getProduct() {
    this.activatedRoute.params.subscribe({
      next: (params) => this.product_id.set(params['product_id']),
    });
    this.productService.getProductById(this.product_id()).subscribe({
      next: (res) => this.product.set(res.payload ?? null),
    });
  }
  ngOnInit(): void {
    this.getProduct();
  }
}
