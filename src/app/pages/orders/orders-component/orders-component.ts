import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../services/order/order-service';
import { IOrder } from '../../../interfaces/iorder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-component',
  standalone: true,
  imports: [],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css',
})
export class OrdersComponent implements OnInit {
  private router: Router = inject(Router);
  orders = signal<IOrder[]>([]);
  private orderService = inject(OrderService);
  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders.set(res.payload ?? []);
      },
      error: (e) => {
        console.error('Error', e);
        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }
  ngOnInit(): void {
    this.getOrders();
  }
}
