import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart/cart-service';
import { Observable } from 'rxjs';
import { ICart } from '../../../interfaces/icart';
import { Router, RouterLinkActive } from '@angular/router';
import { OrderService } from '../../../services/order/order-service';
import { CartItemService } from '../../../services/cartitem/cart-item-service';

@Component({
  selector: 'app-cart-component',
  imports: [],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit {
  private router: Router = inject(Router);
  cartService = inject(CartService);
  private orderService = inject(OrderService);
  private cartItemSrervice = inject(CartItemService);
  getCart() {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cartService.cart.set(res?.payload ?? {});
        console.log(res);
      },
      error: (e) => {
        console.error('Error!', e);
        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }
  checkOut() {
    this.orderService.placeOrder().subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['orders']);
      },
      error: (e) => {
        console.log('error!', e);
      },
    });
  }

  incrementItemQuantity(item_id: string) {
    this.cartItemSrervice.incrementQuantity(item_id).subscribe({
      next: (res) => {
        console.log(res);
        this.getCart();
      },
      error: (e) => console.error('error!', e),
    });
  }
  decrementItemQuantity(item_id: string) {
    this.cartItemSrervice.decrementQuantity(item_id).subscribe({
      next: (res) => {
        console.log(res);
        this.getCart();
      },
      error: (e) => console.error('error!', e),
    });
  }
  ngOnInit(): void {
    this.getCart();
  }
}
