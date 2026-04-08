import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IInventory } from '../../interfaces/iinventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  http = inject(HttpClient);
  createInventory(body: IInventory) {
    return this.http.post(`${environment.CORE_URL}/inventories`, body);
  }
}
