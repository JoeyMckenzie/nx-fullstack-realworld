import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GITHUB_REALWORLD_API_BASE_URL,
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
}
