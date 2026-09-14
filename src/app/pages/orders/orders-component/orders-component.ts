import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { OrderService } from '../../../services/order/order-service';
import { IOrder } from '../../../interfaces/iorder';

@Component({
  selector: 'app-orders-component',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css',
})
export class OrdersComponent implements OnInit {
  private router = inject(Router);
  private orderService = inject(OrderService);

  /**
   * Dummy orders
   * Remove this once the API is ready.
   */
  torders = signal<IOrder[]>([
    {
      id: 'ORD-2026-001',
      status: 'DELIVERED',
      created_at: '2026-09-10T09:30:00',
    },
    {
      id: 'ORD-2026-002',
      status: 'SHIPPED',
      created_at: '2026-09-11T14:45:00',
    },
    {
      id: 'ORD-2026-003',
      status: 'PROCESSING',
      created_at: '2026-09-12T10:15:00',
    },
    {
      id: 'ORD-2026-004',
      status: 'DELIVERED',
      created_at: '2026-09-12T16:20:00',
    },
    {
      id: 'ORD-2026-005',
      status: 'CANCELLED',
      created_at: '2026-09-13T08:50:00',
    },
    {
      id: 'ORD-2026-006',
      status: 'PROCESSING',
      created_at: '2026-09-13T13:10:00',
    },
    {
      id: 'ORD-2026-007',
      status: 'SHIPPED',
      created_at: '2026-09-14T11:25:00',
    },
    {
      id: 'ORD-2026-008',
      status: 'PENDING',
      created_at: '2026-09-14T15:40:00',
    },
  ]);

  /**
   * Orders displayed on the page.
   */
  orders = signal<IOrder[]>(this.torders());

  /**
   * Get orders from API.
   */
  getOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        const apiOrders = res.payload ?? [];

        if (apiOrders.length > 0) {
          this.orders.set(apiOrders);
        } else {
          this.orders.set(this.torders());
        }
      },

      error: (error) => {
        console.error('Error fetching orders:', error);

        // Temporary fallback to dummy data
        this.orders.set(this.torders());

        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      },
    });
  }

  /**
   * Get the CSS classes for an order status.
   */
  getStatusClasses(status: string): string {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';

      case 'SHIPPED':
        return 'bg-blue-100 text-blue-700';

      case 'PROCESSING':
        return 'bg-orange-100 text-orange-700';

      case 'CANCELLED':
        return 'bg-red-100 text-red-700';

      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';

      default:
        return 'bg-slate-100 text-slate-600';
    }
  }

  /**
   * Get the status indicator color.
   */
  getStatusDotClasses(status: string): string {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-500';

      case 'SHIPPED':
        return 'bg-blue-500';

      case 'PROCESSING':
        return 'bg-orange-500';

      case 'CANCELLED':
        return 'bg-red-500';

      case 'PENDING':
        return 'bg-yellow-500';

      default:
        return 'bg-slate-400';
    }
  }

  /**
   * Format status for display.
   *
   * Example:
   * PROCESSING -> Processing
   * DELIVERED  -> Delivered
   */
  formatStatus(status: string): string {
    return status
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  /**
   * Open a specific order.
   */
  viewOrder(orderId: string): void {
    this.router.navigate(['/orders', orderId]);
  }

  /**
   * Navigate to products.
   */
  startShopping(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    // Keep commented while testing dummy data.
    // this.getOrders();
    // Uncomment when you want to use the API:
    // this.getOrders();
  }
}
