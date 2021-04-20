import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserLoginRequest,
  UserLoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { Observable } from 'rxjs';
import { environment } from '@conduit/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  registerUser(
    request: UserRegistrationRequest
  ): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(
      `${environment.apiBaseUrl}/users`,
      {
        user: request,
      }
    );
  }

  loginUser(request: UserLoginRequest): Observable<UserRegistrationResponse> {
    return this.http.post<UserLoginResponse>(
      `${environment.apiBaseUrl}/users`,
      {
        user: request,
      }
    );
  }
}
