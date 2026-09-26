import { Component, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../../services/product/product-service';

import { CartService } from '../../../services/cart/cart-service';

import { ICategory } from '../../../interfaces/icategory';
import { IApiResponse } from '../../../interfaces/iapiresponse';
import { IProduct } from '../../../interfaces/iproduct';

@Component({
  selector: 'app-productspage-component',
  imports: [],
  templateUrl: './productspage-component.html',
  styleUrl: './productspage-component.css',
})
export class ProductspageComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  productsToDisplay = this.productService.productsToDisplay;

  currentPage = signal(1);

  pageSize = signal(20);

  totalProducts = this.productService.totalProducts;

  totalPages = this.productService.totalPages;

  loadingProducts = this.productService.loadingProducts;

  selectedCategory = signal<ICategory | null>(null);

  search = this.productService.search;

  minPrice = signal<number | undefined>(undefined);

  maxPrice = signal<number | undefined>(undefined);

  inStock = signal<boolean | undefined>(undefined);

  sidebarCollapsed = signal(false);

  categories = [
    {
      title: 'All Products',
      value: '',
      isActive: true,
      class: 'fa-solid fa-store text-sm',
    },

    {
      title: 'Electronics',
      value: 'electronics',
      isActive: false,
      class: 'fa-solid fa-mobile-screen-button text-sm',
    },

    {
      title: 'Fashion',
      value: 'fashion',
      isActive: false,
      class: 'fa-solid fa-shirt text-sm',
    },

    {
      title: 'Home & Living',
      value: 'home & living',
      isActive: false,
      class: 'fa-solid fa-house text-sm',
    },

    {
      title: 'Beauty',
      value: 'beauty',
      isActive: false,
      class: 'fa-solid fa-wand-magic-sparkles text-sm',
    },
  ];

  getActiveTab(category: string): boolean {
    return this.selectedCategory()?.value === category;
  }

  displayCategories() {
    return this.categories.map((category) => ({
      ...category,
      isActive: this.getActiveTab(category.value),
    }));
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category') ?? '';

      const cat = this.categories.find((c) => c.value === category);

      const page = Number(params.get('page') ?? 1);

      this.selectedCategory.set(cat ?? null);

      this.currentPage.set(page > 0 ? page : 1);

      this.loadProducts();
    });
  }

  loadProducts(): void {
    const page = this.currentPage();

    const limit = this.pageSize();

    const skip = (page - 1) * limit;

    this.productService.loadProducts({
      skip,
      limit,
      category: this.selectedCategory()?.value || undefined,
      search: this.search() || undefined,
      min_price: this.minPrice(),
      max_price: this.maxPrice(),
      in_stock: this.inStock(),
      sort_by: 'created_at',
      sort_order: 'desc',
    });
    // this.productsToDisplay.set(res.items??[])

    // const params: ListProductsParams = {
    //   skip,

    //   limit,

    //   category: this.selectedCategory()?.value || undefined,

    //   search: this.search() || undefined,

    //   min_price: this.minPrice(),

    //   max_price: this.maxPrice(),

    //   in_stock: this.inStock(),

    //   sort_by: 'created_at',

    //   sort_order: 'desc',
    // };

    // this.productService.getProducts(params).subscribe({
    //   next: (res) => {
    //     this.productsToDisplay.set(res.items ?? []);

    //     this.totalProducts.set(res.total ?? 0);

    //     this.totalPages.set(res.total_pages ?? 0);

    //     this.loadingProducts.set(false);
    //   },

    //   error: (e) => {
    //     this.loadingProducts.set(false);

    //     console.error('Error fetching products', e);

    //     if (e.status === 401) {
    //       this.router.navigate(['login']);
    //     }
    //   },
    // });
  }

  selectCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: {
        category: category || null,

        page: 1,
      },
    });
  }

  visiblePages(): (number | 'ellipsis')[] {
    const total = this.totalPages();
    const current = this.currentPage();

    // Show everything when there aren't many pages
    if (total <= 9) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis')[] = [];

    // First 3 pages
    pages.push(1, 2, 3);

    // Pages around the current page
    const start = Math.max(4, current - 1);
    const end = Math.min(total - 3, current + 1);

    // Add ellipsis if there is a gap
    if (start > 4) {
      pages.push('ellipsis');
    }

    // Current page and surrounding pages
    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    // Add ellipsis before last 3 pages
    if (end < total - 3) {
      pages.push('ellipsis');
    }

    // Last 3 pages
    pages.push(total - 2, total - 1, total);

    return pages;
  }

  nextPage(): void {
    if (this.currentPage() >= this.totalPages()) {
      return;
    }

    const nextPage = this.currentPage() + 1;

    this.router
      .navigate([], {
        relativeTo: this.route,

        queryParams: {
          page: nextPage,
        },

        queryParamsHandling: 'merge',
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
  }

  previousPage(): void {
    if (this.currentPage() <= 1) {
      return;
    }

    const previousPage = this.currentPage() - 1;

    this.router
      .navigate([], {
        relativeTo: this.route,

        queryParams: {
          page: previousPage,
        },

        queryParamsHandling: 'merge',
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }

    this.router
      .navigate([], {
        relativeTo: this.route,

        queryParams: {
          page: page,
        },

        queryParamsHandling: 'merge',
      })
      .then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  clearFilters(): void {
    this.search.set('');

    this.minPrice.set(undefined);

    this.maxPrice.set(undefined);

    this.inStock.set(undefined);

    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        category: null,
        page: 1,
      },
    });
  }

  navigateToDetails(productId: string): void {
    this.router.navigate(['products', productId]);
  }

  getCart(): void {
    this.cartService.getCart().subscribe((res) => {
      this.cartService.cart.set(res.payload ?? {});
    });
  }

  addToCart(productId: string): void {
    this.productService.addToCart(productId);
    return;
  }
}
