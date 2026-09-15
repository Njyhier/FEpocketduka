import { Component, computed, inject, OnInit, signal } from '@angular/core';
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

  // --------------------------------------------------
  // Orders
  // --------------------------------------------------
  orders = signal<IOrder[]>([]);

  isLoading = signal(false);

  updatingOrderId = signal<string | null>(null);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  currentPage = signal(1);

  itemsPerPage = signal(5);

  totalPages = computed(() => {
    return Math.ceil(this.orders().length / this.itemsPerPage());
  });

  paginatedOrders = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage();

    const endIndex = startIndex + this.itemsPerPage();

    return this.orders().slice(startIndex, endIndex);
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    const pages: number[] = [];

    if (total === 0) {
      return pages;
    }

    // Show all pages when there are 7 or fewer
    if (total <= 7) {
      for (let page = 1; page <= total; page++) {
        pages.push(page);
      }

      return pages;
    }

    // First page
    pages.push(1);

    // Left ellipsis
    if (current > 4) {
      pages.push(-1);
    }

    // Pages around current page
    const startPage = Math.max(2, current - 1);
    const endPage = Math.min(total - 1, current + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    // Right ellipsis
    if (current < total - 3) {
      pages.push(-1);
    }

    // Last page
    pages.push(total);

    return pages;
  });

  paginationStart = computed(() => {
    if (this.orders().length === 0) {
      return 0;
    }

    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  });

  paginationEnd = computed(() => {
    return Math.min(this.currentPage() * this.itemsPerPage(), this.orders().length);
  });

  // --------------------------------------------------
  // Pagination Methods
  // --------------------------------------------------

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  // --------------------------------------------------
  // Get Orders
  // --------------------------------------------------

  displayOrders(): void {
    this.isLoading.set(true);

    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        console.log('Orders from API:', res);

        const apiOrders = res?.payload ?? [];

        if (apiOrders.length > 0) {
          this.orders.set(apiOrders);
        } else {
          this.orders.set(this.dummyOrders());
        }

        // Reset pagination after loading orders
        this.currentPage.set(1);

        this.isLoading.set(false);
      },

      error: (error) => {
        console.error('Error fetching orders:', error);

        // Keep the page populated during development
        // if the backend is unavailable.
        this.orders.set(this.dummyOrders());

        this.currentPage.set(1);

        this.isLoading.set(false);
      },
    });
  }

  // --------------------------------------------------
  // Update Order Status
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Status Styling
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------

  ngOnInit(): void {
    this.displayOrders();
  }
}
