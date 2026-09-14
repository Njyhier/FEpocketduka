import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { OrderService } from '../../../../../services/order/order-service';
import { IOrder } from '../../../../../interfaces/iorder';

@Component({
  selector: 'app-orders-component',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css',
})
export class OrdersComponent implements OnInit {
  private orderService = inject(OrderService);

  // --------------------------------------------------
  // Dummy orders for development
  // --------------------------------------------------
  dummyOrders = signal<IOrder[]>([
    {
      id: 'ORD-2026-001',
      status: 'DELIVERED',
      created_at: '2026-09-08T09:30:00',
    },
    {
      id: 'ORD-2026-002',
      status: 'SHIPPED',
      created_at: '2026-09-09T14:45:00',
    },
    {
      id: 'ORD-2026-003',
      status: 'PROCESSING',
      created_at: '2026-09-10T10:15:00',
    },
    {
      id: 'ORD-2026-004',
      status: 'PENDING',
      created_at: '2026-09-11T16:20:00',
    },
    {
      id: 'ORD-2026-005',
      status: 'DELIVERED',
      created_at: '2026-09-12T08:50:00',
    },
    {
      id: 'ORD-2026-006',
      status: 'PROCESSING',
      created_at: '2026-09-12T13:10:00',
    },
    {
      id: 'ORD-2026-007',
      status: 'SHIPPED',
      created_at: '2026-09-13T11:25:00',
    },
    {
      id: 'ORD-2026-008',
      status: 'CANCELLED',
      created_at: '2026-09-13T15:40:00',
    },
    {
      id: 'ORD-2026-009',
      status: 'DELIVERED',
      created_at: '2026-09-14T09:05:00',
    },
    {
      id: 'ORD-2026-010',
      status: 'PENDING',
      created_at: '2026-09-14T12:30:00',
    },
  ]);

  orders = signal<IOrder[]>([]);

  isLoading = signal(false);

  updatingOrderId = signal<string | null>(null);

  displayOrders(): void {
    this.isLoading.set(true);

    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        console.log('Orders from API:', res);

        const apiOrders = res?.payload ?? [];

        // Use real API orders if available.
        // Otherwise use dummy orders.
        if (apiOrders.length > 0) {
          this.orders.set(apiOrders);
        } else {
          this.orders.set(this.dummyOrders());
        }

        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Error fetching orders:', error);

        // Keep the page populated during development
        // if the backend is unavailable.
        this.orders.set(this.dummyOrders());

        this.isLoading.set(false);
      },
    });
  }

  updateOrderStatus(orderId: string): void {
    if (!orderId) {
      return;
    }

    this.updatingOrderId.set(orderId);

    this.orderService.updateOrderStatus(orderId).subscribe({
      next: (res) => {
        console.log('Order status updated:', res);

        this.updatingOrderId.set(null);

        // Reload orders after successful update.
        this.displayOrders();
      },

      error: (error) => {
        console.error('Error updating order status:', error);

        this.updatingOrderId.set(null);
      },
    });
  }

  getStatusClasses(status: string): string {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';

      case 'SHIPPED':
        return 'bg-blue-100 text-blue-700';

      case 'PROCESSING':
        return 'bg-orange-100 text-orange-700';

      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';

      case 'CANCELLED':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  getStatusDotClasses(status: string): string {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return 'bg-green-500';

      case 'SHIPPED':
        return 'bg-blue-500';

      case 'PROCESSING':
        return 'bg-orange-500';

      case 'PENDING':
        return 'bg-yellow-500';

      case 'CANCELLED':
        return 'bg-red-500';

      default:
        return 'bg-slate-400';
    }
  }

  formatStatus(status: string): string {
    if (!status) {
      return 'Unknown';
    }

    return status
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  ngOnInit(): void {
    this.displayOrders();
  }
}
