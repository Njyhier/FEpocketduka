import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ICart } from '../../interfaces/icart';
import { IApiresponse } from '../../interfaces/iapiresponse';
import { ICartItem } from '../../interfaces/icart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  cart = signal<ICart>({});
  items = computed<ICartItem[]>(() => this.cart().items ?? []);

  getCart(): Observable<IApiresponse<ICart>> {
    return this.http.get<IApiresponse<ICart>>(`${environment.CORE_URL}/carts/by_user_id`);
  }

  updateCart(cartId: string, data: ICart): Observable<IApiresponse<ICart>> {
    return this.http.patch<IApiresponse<ICart>>(`${environment.CORE_URL}/carts/${cartId}`, data);
  }
}
