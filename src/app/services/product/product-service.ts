import { inject, Injectable, signal } from '@angular/core';
import { IProduct, ListProductsParams } from '../../interfaces/iproduct';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IApiResponse, IApiresponse } from '../../interfaces/iapiresponse';
import { CartService } from '../cart/cart-service';
import { CartItemService } from '../cartitem/cart-item-service';
import { Router } from '@angular/router';
import { ICategory } from '../../interfaces/icategory';

export type LiProductParams = {
  skip?: number;
  limit?: number;
  search?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  sort_by?: 'name' | 'price' | 'created_at' | 'id';
  sort_order?: 'asc' | 'desc';
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsToDisplay = signal<IProduct[]>([]);

  totalProducts = signal(0);

  totalPages = signal(0);

  loadingProducts = signal(false);

  inStock = signal<boolean | undefined>(undefined);
  private router = inject(Router);
  http = inject(HttpClient);
  cartService = inject(CartService);
  cartItemService = inject(CartItemService);

  createProduct(data: IProduct): Observable<IApiresponse<string>> {
    return this.http.post<IApiresponse<string>>(`${environment.CORE_URL}/products`, data);
  }

  search = signal<string>('');
  setSearch(q: string) {
    this.search.set(q);
  }

  getProducts(params: ListProductsParams = {}) {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });

    return this.http.get<IApiResponse<IProduct>>(`${environment.CORE_URL}/products`, {
      params: httpParams,
    });
  }

  getProductById(product_id: string): Observable<IApiresponse<IProduct>> {
    return this.http.get<IApiresponse<IProduct>>(`${environment.CORE_URL}/products/${product_id}`);
  }

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

  loadProducts(params?: ListProductsParams) {
    this.loadingProducts.set(true);

    this.getProducts(params).subscribe({
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
}
