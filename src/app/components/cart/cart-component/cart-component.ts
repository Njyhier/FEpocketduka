import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart-service';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order-service';
import { CartItemService } from '../../../services/cartitem/cart-item-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-component',
  imports: [ReactiveFormsModule],
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit {
  private router: Router = inject(Router);
  cartService = inject(CartService);
  phone = new FormControl<string>('');
  constructor(
    private orderService: OrderService,
    private cartItemSrervice: CartItemService,
  ) {}
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
  sendStkPush() {
    console.log('sending prompt');
    const phoneValue = this.phone.value ?? '';
    const user_id = this.cartService.cart()?.user_id ?? '';
    const amount = this.cartService.cart()?.subtotal ?? 0;
    const data = {
      amount: String(2),
    };
    console.log('sending push...', phoneValue, user_id, data.amount);
    return this.orderService.placeOrder(user_id, phoneValue, data).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.error(e),
    });
  }
  checkOut() {
    this.orderService.simulattion().subscribe({
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
