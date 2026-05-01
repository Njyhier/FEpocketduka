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
  placeOrder(user_id: string, phone: string, data: object): Observable<IOrder> {
    return this.http.post<IOrder>(
      `${environment.CORE_URL}/users/${user_id}/payments?phone_number=${phone}`,
      data,
    );
  }
  simulattion() {
    const data = {
      Body: {
        stkCallback: {
          MerchantRequestID: '29115-34620561-1',
          CheckoutRequestID: 'ws_CO_25042026131339197712767988',
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 1.0 },
              { Name: 'MpesaReceiptNumber', Value: 'NLJ7RT61SV' },
              { Name: 'TransactionDate', Value: 20191219102115 },
              { Name: 'PhoneNumber', Value: 254708374149 },
            ],
          },
        },
      },
    };
    return this.http.post(`${environment.CORE_URL}/callback`, data);
  }
}
