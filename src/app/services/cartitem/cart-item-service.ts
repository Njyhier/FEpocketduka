import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { Observable } from 'rxjs';
import { IApiresponse } from '../../interfaces/iapiresponse';
import { ICartItem } from '../../interfaces/icart-item';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  private http = inject(HttpClient);
  addTocart(product_id: string): Observable<IApiresponse<ICartItem>> {
    return this.http.post<IApiresponse<ICartItem>>(
      `${environment.CORE_URL}/cartitems/${product_id}`,
      {},
    );
  }
}
