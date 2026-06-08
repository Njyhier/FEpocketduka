import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart/cart-service';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order/order-service';
import { CartItemService } from '../../../services/cartitem/cart-item-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ICart } from '../../../interfaces/icart';

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
    if (!this.cartService.cart().subtotal) {
      alert('No items in cart');
      return;
    }
    console.log('sending prompt');
    const phoneValue = this.phone.value ?? '';
    if (!phoneValue) {
      alert('Please enter phone number');
      return;
    }
    const user_id = this.cartService.cart()?.user_id ?? '';
    const amount = this.cartService.cart()?.subtotal ?? 0;
    const data = {
      amount: String(amount),
    };
    console.log('sending push...', phoneValue, user_id, data.amount);
    return this.orderService
      .placeOrder(user_id, phoneValue, data)
      .pipe()
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.getCart();
        },
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

  incrementIQuantity(itemId: string) {
    this.cartService?.cart?.update((x) => {
      const items = x.items ?? [];
      let total = x.total_items ?? 0;
      let updatedItems = items.map((i) => {
        if (i.id === itemId) {
          total += 1;
          const qt = i.quantity === 0 ? i.quantity : (i?.quantity ?? 0) + 1;
          const sub = (i.price ?? 0) * qt;
          return {
            ...i,
            quantity: qt,
            subtotal: (i.price ?? 0) * qt,
          };
        }
        return i;
      });
      updatedItems = updatedItems.filter((x) => x.quantity !== 0);
      function setSubtotal() {
        return updatedItems.reduce((total = 0, item) => total + (item.subtotal ?? 0), 0) ?? 0;
      }
      return {
        ...x,
        total_items: total,
        subtotal: setSubtotal(),
        items: updatedItems,
      };
    });
  }
  decrementIQuantity(itemId: string) {
    this.cartService?.cart?.update((x) => {
      const items = x.items ?? [];
      let total = x.total_items ?? 0;
      let updatedItems = items.map((i) => {
        if (i.id === itemId && i.quantity) {
          total -= 1;
          const qt = (i.quantity ?? 0) - 1;
          return {
            ...i,
            subtotal: (i.price ?? 0) * qt,
            quantity: qt,
          };
        }
        return i;
      });
      updatedItems = updatedItems.filter((x) => x.quantity !== 0);
      function setSubtotal() {
        return updatedItems.reduce((total = 0, item) => total + (item.subtotal ?? 0), 0) ?? 0;
      }
      return {
        ...x,
        total_items: total,
        subtotal: setSubtotal(),
        items: updatedItems,
      };
    });
  }

  incrementItemQuantity(item_id: string) {
    const item = this.cartService.cart().items?.find((i) => i.id == item_id);
    const qt = (item?.quantity ?? 0) + 1;
    this.cartItemSrervice.incrementQuantity(item_id, qt).subscribe({
      next: (res) => {
        this.incrementIQuantity(item_id);
        console.log(res);
      },
      error: (e) => console.error('error!', e),
    });
  }
  decrementItemQuantity(item_id: string) {
    const item = this.cartService.cart().items?.find((i) => i.id == item_id);
    const qt = (item?.quantity ?? 0) - 1;
    this.cartItemSrervice.decrementQuantity(item_id, qt).subscribe({
      next: (res) => {
        this.decrementIQuantity(item_id);
        console.log(res);
      },
      error: (e) => console.error('error!', e),
    });
  }
  ngOnInit(): void {
    this.getCart();
  }
}
