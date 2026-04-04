import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product/product-service';
import { IProduct } from '../../../interfaces/iproduct';
import { Router } from '@angular/router';
import { CartItemService } from '../../../services/cartitem/cart-item-service';

@Component({
  selector: 'app-productspage-component',
  imports: [],
  templateUrl: './productspage-component.html',
  styleUrl: './productspage-component.css',
})
export class ProductspageComponent implements OnInit {
  productService = inject(ProductService);
  productsToDisplay = signal<IProduct[]>([]);
  private router: Router = inject(Router);
  private cartItemService = inject(CartItemService);
  displayProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productsToDisplay.set(res.payload ?? []);
      },
      error: (e) => {
        console.log('Error Feching Products', e.message);
        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  ngOnInit(): void {
    this.displayProducts();
  }
  navigateToDetails(product_id: string) {
    this.router.navigate(['productdetails', product_id]);
  }
  addToCart(product_id: string) {
    this.cartItemService.addTocart(product_id).subscribe({
      next: (res) => console.log(res),
      error: (e) => {
        console.error('Error', e);
        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }
}
