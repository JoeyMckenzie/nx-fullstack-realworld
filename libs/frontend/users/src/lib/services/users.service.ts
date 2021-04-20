import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GITHUB_REALWORLD_API_BASE_URL,
  UserLoginRequest,
  UserLoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  registerUser(
    request: UserRegistrationRequest
  ): Observable<UserRegistrationResponse> {
    return this.http.post<UserRegistrationResponse>(
      `${GITHUB_REALWORLD_API_BASE_URL}/users`,
      {
        user: request,
      }
    );
  }

  loginUser(request: UserLoginRequest): Observable<UserRegistrationResponse> {
    return this.http.post<UserLoginResponse>(
      `${GITHUB_REALWORLD_API_BASE_URL}/users`,
      {
        user: request,
      }
    );
  }
}
