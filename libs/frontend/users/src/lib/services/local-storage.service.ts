import { Injectable } from '@angular/core';
import {
  Maybe,
  isStringNullUndefinedOrEmpty,
} from '@nx-fullstack-realworld/shared';

const TOKEN_KEY = 'token';

@Injectable()
export class LocalStorageService {
  getToken(): Maybe<string> {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!isStringNullUndefinedOrEmpty(token)) {
      return token;
    }

    return undefined;
  }

  setToken(token: string): string {
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }
}
