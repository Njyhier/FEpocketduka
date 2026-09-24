import { inject, Injectable } from '@angular/core';
import { IProduct, ListProductsParams } from '../../interfaces/iproduct';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IApiResponse, IApiresponse } from '../../interfaces/iapiresponse';

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
  http = inject(HttpClient);
  createProduct(data: IProduct): Observable<IApiresponse<string>> {
    return this.http.post<IApiresponse<string>>(`${environment.CORE_URL}/products`, data);
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
}
