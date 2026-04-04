import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../../services/cart/cart-service';
import { Observable } from 'rxjs';
import { ICart } from '../../../interfaces/icart';
import { Router, RouterLinkActive } from '@angular/router';
import { OrderService } from '../../../services/order/order-service';

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
      },
      error: (e) => {
        console.log('error!', e);
      },
    });
  }
  ngOnInit(): void {
    this.getCart();
  }
}
