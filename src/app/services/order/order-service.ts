import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiresponse } from '../../interfaces/iapiresponse';
import { IOrder } from '../../interfaces/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  getOrders(): Observable<IApiresponse<IOrder[]>> {
    return this.http.get<IApiresponse<IOrder[]>>(`${environment.CORE_URL}/orders/cart_id`);
  }
  getAllOrders(): Observable<IApiresponse<IOrder[]>> {
    return this.http.get<IApiresponse<IOrder[]>>(`${environment.CORE_URL}/orders`);
  }
  updateOrderStatus(order_id: string) {
    return this.http.patch(`${environment.CORE_URL}/orders/${order_id}`, {});
  }
  placeOrder(): Observable<IOrder> {
    return this.http.post<IOrder>(`${environment.CORE_URL}/orders`, {});
  }
}
