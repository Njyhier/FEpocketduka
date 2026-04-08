import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../interfaces/iuser';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiresponse } from '../../interfaces/iapiresponse';
import { Itoken } from '../../interfaces/itoken';
import { Authservice } from '../auth/authservice';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private authService = inject(Authservice);
  signUp(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${environment.CORE_URL}/sign_up`, data);
  }
  login(data: IUser): Observable<IApiresponse<Itoken>> {
    return this.http.post<IApiresponse<Itoken>>(`${environment.CORE_URL}/login`, data);
  }
}
