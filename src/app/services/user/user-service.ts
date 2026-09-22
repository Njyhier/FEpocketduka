// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { IUser } from '../../interfaces/iuser';
// import { environment } from '../../../environments/environment';
// import { Observable } from 'rxjs';
// import { IApiresponse } from '../../interfaces/iapiresponse';
// import { Itoken } from '../../interfaces/itoken';
// import { Authservice } from '../auth/authservice';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private http = inject(HttpClient);
//   private authService = inject(Authservice);
//   signUp(data: IUser): Observable<IUser> {
//     return this.http.post<IUser>(`${environment.CORE_URL}/sign_up`, data);
//   }
//   login(data: IUser): Observable<IApiresponse<Itoken>> {
//     return this.http.post<IApiresponse<Itoken>>(`${environment.CORE_URL}/login`, data);
//   }
// }

import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IPaginatedResponse,
  IUser,
  IUserCreate,
  IUserListParams,
  IUserRoleUpdate,
  IUserUpdate,
} from '../../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.CORE_URL}/users`;

  // -----------------------------
  // Create
  // -----------------------------

  createUser(user: IUserCreate): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl, user);
  }

  // -----------------------------
  // Get users
  // -----------------------------

  getUsers(params?: IUserListParams): Observable<IPaginatedResponse<IUser>> {
    let httpParams = new HttpParams();

    if (params?.page !== undefined) {
      httpParams = httpParams.set('page', params.page);
    }

    if (params?.page_size !== undefined) {
      httpParams = httpParams.set('page_size', params.page_size);
    }

    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<IPaginatedResponse<IUser>>(this.baseUrl, {
      params: httpParams,
    });
  }

  // -----------------------------
  // Get user by ID
  // -----------------------------

  getUserById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${userId}`);
  }

  // -----------------------------
  // Update user
  // -----------------------------

  updateUser(userId: string, user: IUserUpdate): Observable<IUser> {
    return this.http.patch<IUser>(`${this.baseUrl}/${userId}`, user);
  }

  // -----------------------------
  // Update roles
  // -----------------------------

  updateUserRoles(userId: string, data: IUserRoleUpdate): Observable<IUser> {
    return this.http.patch<IUser>(`${this.baseUrl}/${userId}/roles`, data);
  }

  // -----------------------------
  // Delete user
  // -----------------------------

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }
}

export const sampleUserProfile = {
  _id: 'usr_001',
  username: 'john.doe',
  email: 'john.doe@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone_number: '+254 712 345 678',
  profile_image: null,
  is_active: true,
  created_at: '2026-08-15T10:30:00Z',
  updated_at: '2026-09-20T14:45:00Z',
};
