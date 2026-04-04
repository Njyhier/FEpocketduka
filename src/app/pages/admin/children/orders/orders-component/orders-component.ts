import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../../../../services/order/order-service';
import { IOrder } from '../../../../../interfaces/iorder';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-component',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);
  orders = signal<IOrder[]>([]);

  displayOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        console.log(res);
        this.orders.set(res?.payload ?? []);
      },
    });
  }

  updateOrderStatus(order_id: string) {
    this.orderService.updateOrderStatus(order_id).subscribe({
      next: (res) => console.log(res),
      error: (e) => console.error('Error!', e),
    });
    this.displayOrders();
  }

  ngOnInit(): void {
    this.displayOrders();
  }
}
