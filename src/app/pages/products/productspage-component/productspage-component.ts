import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../services/product/product-service';
import { IProduct } from '../../../interfaces/iproduct';
import { Router } from '@angular/router';
import { CartItemService } from '../../../services/cartitem/cart-item-service';
import { CartService } from '../../../services/cart/cart-service';

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
  constructor(private cartService: CartService) {}
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
    this.router.navigate(['products', product_id]);
  }
  addToCart(product_id: string) {
    const presentItem = this.cartService.cart()?.items?.find((x) => x.product_id === product_id);
    if (presentItem) {
      console.log('Item present');
      this.cartItemService
        .incrementQuantity(presentItem.id ?? '', (presentItem.quantity ?? 0) + 1)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.cartService.getCart().subscribe((res) => {
              console.log(res);
              this.cartService.cart.set(res.payload ?? {});
            });
          },
        });
      return;
    }
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
