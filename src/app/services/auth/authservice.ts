import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.dev';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  platformId = inject(PLATFORM_ID);
  private http = inject(HttpClient);
  loginForAccessToken(username: string, password: string) {
    const body = new HttpParams().set('username', username).set('password', password);
    return this.http.post<any>(`${environment.CORE_URL}/token`, body);
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
  }

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  removeToken() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  }
  userLoggedIn() {
    const token = this.getToken();
    return Boolean(token);
  }
}
