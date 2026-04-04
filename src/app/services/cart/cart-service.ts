import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { Observable } from 'rxjs';
import { ICart } from '../../interfaces/icart';
import { IApiresponse } from '../../interfaces/iapiresponse';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  cart = signal<ICart>({});

  getCart(): Observable<IApiresponse<ICart>> {
    return this.http.get<IApiresponse<ICart>>(`${environment.CORE_URL}/carts/by_user_id`);
  }
}
