import { Component, inject, OnInit, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../../services/product/product-service';
import { IProduct } from '../../../interfaces/iproduct';

import { CartItemService } from '../../../services/cartitem/cart-item-service';
import { CartService } from '../../../services/cart/cart-service';

import { ListProductsParams } from '../../../interfaces/iproduct';

@Component({
  selector: 'app-productspage-component',
  imports: [],
  templateUrl: './productspage-component.html',
  styleUrl: './productspage-component.css',
})
export class ProductspageComponent implements OnInit {
  // =========================================================
  // SERVICES
  // =========================================================

  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cartItemService = inject(CartItemService);
  private cartService = inject(CartService);

  // =========================================================
  // PRODUCTS
  // =========================================================

  productsToDisplay = signal<IProduct[]>([]);

  // =========================================================
  // PAGINATION
  // =========================================================

  currentPage = signal(1);

  pageSize = signal(20);

  totalProducts = signal(0);

  totalPages = signal(0);

  loadingProducts = signal(false);

  // =========================================================
  // FILTERS
  // =========================================================

  selectedCategory = signal('');

  search = signal('');

  minPrice = signal<number | undefined>(undefined);

  maxPrice = signal<number | undefined>(undefined);

  inStock = signal<boolean | undefined>(undefined);

  // =========================================================
  // SIDEBAR
  // =========================================================

  sidebarCollapsed = signal(false);

  // =========================================================
  // CATEGORIES
  // =========================================================

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

  // =========================================================
  // CATEGORY UI
  // =========================================================

  getActiveTab(category: string): boolean {
    return this.selectedCategory() === category;
  }

  displayCategories() {
    return this.categories.map((category) => ({
      ...category,
      isActive: this.getActiveTab(category.value),
    }));
  }

  // =========================================================
  // INITIALIZATION
  // =========================================================

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category') ?? '';

      const page = Number(params.get('page') ?? 1);

      this.selectedCategory.set(category);

      this.currentPage.set(page > 0 ? page : 1);

      this.loadProducts();
    });
  }

  // =========================================================
  // LOAD PRODUCTS
  // =========================================================

  loadProducts(): void {
    this.loadingProducts.set(true);

    const page = this.currentPage();

    const limit = this.pageSize();

    const skip = (page - 1) * limit;

    const params: ListProductsParams = {
      skip,

      limit,

      category: this.selectedCategory() || undefined,

      search: this.search() || undefined,

      min_price: this.minPrice(),

      max_price: this.maxPrice(),

      in_stock: this.inStock(),

      sort_by: 'created_at',

      sort_order: 'desc',
    };

    this.productService.getProducts(params).subscribe({
      next: (res) => {
        this.productsToDisplay.set(res.items ?? []);

        this.totalProducts.set(res.total ?? 0);

        this.totalPages.set(res.total_pages ?? 0);

        this.loadingProducts.set(false);
      },

      error: (e) => {
        this.loadingProducts.set(false);

        console.error('Error fetching products', e);

        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }

  // =========================================================
  // CATEGORY CHANGE
  // =========================================================

  selectCategory(category: string): void {
    this.router.navigate(['/products'], {
      queryParams: {
        category: category || null,

        page: 1,
      },
    });
  }

  // =========================================================
  // NEXT PAGE
  // =========================================================

  nextPage(): void {
    if (this.currentPage() >= this.totalPages()) {
      return;
    }

    const nextPage = this.currentPage() + 1;

    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        page: nextPage,
      },

      queryParamsHandling: 'merge',
    });
  }

  // =========================================================
  // PREVIOUS PAGE
  // =========================================================

  previousPage(): void {
    if (this.currentPage() <= 1) {
      return;
    }

    const previousPage = this.currentPage() - 1;

    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        page: previousPage,
      },

      queryParamsHandling: 'merge',
    });
  }

  // =========================================================
  // GO TO SPECIFIC PAGE
  // =========================================================

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.router.navigate([], {
      relativeTo: this.route,

      queryParams: {
        page,
      },

      queryParamsHandling: 'merge',
    });
  }

  // =========================================================
  // SIDEBAR
  // =========================================================

  toggleSidebar(): void {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

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

  // =========================================================
  // PRODUCT DETAILS
  // =========================================================

  navigateToDetails(productId: string): void {
    this.router.navigate(['products', productId]);
  }

  // =========================================================
  // CART
  // =========================================================

  getCart(): void {
    this.cartService.getCart().subscribe((res) => {
      this.cartService.cart.set(res.payload ?? {});
    });
  }

  addToCart(productId: string): void {
    const presentItem = this.cartService
      .cart()
      ?.items?.find((item) => item.product_id === productId);

    if (presentItem) {
      this.cartItemService
        .incrementQuantity(presentItem.id ?? '', (presentItem.quantity ?? 0) + 1)
        .subscribe({
          next: () => {
            this.getCart();
          },
        });

      return;
    }

    this.cartItemService.addTocart(productId).subscribe({
      next: () => {
        this.getCart();
      },

      error: (e) => {
        console.error('Error adding to cart', e);

        if (e.status === 401) {
          this.router.navigate(['login']);
        }
      },
    });
  }
}
