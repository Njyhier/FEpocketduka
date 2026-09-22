// import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
// import { HttpParams, HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { isPlatformBrowser } from '@angular/common';
// import { sign } from 'crypto';
// import { IUser } from '../../interfaces/iuser';
// @Injectable({
//   providedIn: 'root',
// })
// export class Authservice {
//   platformId = inject(PLATFORM_ID);
//   currentUser = signal<IUser | null>(null);
//   isLoggedIn = computed(() => this.currentUser() !== null);
//   private http = inject(HttpClient);
//   loginForAccessToken(username: string, password: string) {
//     const body = new HttpParams().set('username', username).set('password', password);
//     return this.http.post<any>(`${environment.CORE_URL}/token`, body);
//   }

//   setCurrentUser(user: IUser) {
//     this.currentUser.set(user);
//   }

//   setToken(token: string) {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem('access_token', token);
//     }
//   }

//   getToken() {
//     if (isPlatformBrowser(this.platformId)) {
//       return localStorage.getItem('access_token');
//     }
//     return null;
//   }

//   removeToken() {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.removeItem('access_token');
//     }
//   }
//   userLoggedIn() {
//     const token = this.getToken();
//     return Boolean(token);
//   }

//   isAuthorised(requiredRole: string): boolean {
//     const user = this.currentUser();

//     if (!user || !user.role_names) {
//       return false;
//     }

//     return user.role_names?.includes(requiredRole);
//   }

//   getLoggedinUser() {
//     return this.currentUser();
//   }
// }

import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IUser } from '../../interfaces/iuser';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: IUser;
}

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);

  // Private writable signal
  private readonly _currentUser = signal<IUser | null>(null);

  // Public read-only signal
  readonly currentUser = this._currentUser.asReadonly();

  // Derived state
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  loginForAccessToken(username: string, password: string) {
    const body = new HttpParams().set('username', username).set('password', password);

    return this.http.post<TokenResponse>(`${environment.CORE_URL}/auth/login`, body);
  }

  setCurrentUser(user: IUser): void {
    this._currentUser.set(user);
  }

  clearCurrentUser(): void {
    this._currentUser.set(null);
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('access_token');
    }

    return null;
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
    }
  }

  userLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  isAuthorised(requiredRole: string): boolean {
    const user = this.currentUser();

    if (!user || !user.role_names) {
      return false;
    }
    console.log(user.role_names);
    console.log(requiredRole);

    return user.role_names.includes(requiredRole);
  }

  logout(): void {
    this.removeToken();
    this.clearCurrentUser();
  }
}
