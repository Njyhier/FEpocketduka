import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IApiresponse } from '../../interfaces/iapiresponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  createProduct(data: IProduct): Observable<IApiresponse<string>> {
    return this.http.post<IApiresponse<string>>(`${environment.CORE_URL}/products`, data);
  }
  getProducts(): Observable<IApiresponse<IProduct[]>> {
    return this.http.get<IApiresponse<IProduct[]>>(`${environment.CORE_URL}/products`);
  }

  getProductById(product_id: string): Observable<IApiresponse<IProduct>> {
    return this.http.get<IApiresponse<IProduct>>(`${environment.CORE_URL}/products/${product_id}`);
  }
}
