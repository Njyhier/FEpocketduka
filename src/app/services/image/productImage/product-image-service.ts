import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IImage } from '../../../interfaces/iimage';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  private http = inject(HttpClient);
  uploadProductImage(productId: string, data: File): Observable<IImage> {
    const formData = new FormData();
    formData.append('image', data);
    return this.http.post<IImage>(
      `${environment.CORE_URL}/upload_image?product_id=${productId}`,
      formData,
    );
  }
}
