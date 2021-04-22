import { HttpErrorResponse } from '@angular/common/http';
import {
  ApiError,
  ErrorResponse,
  User,
  UserRegistrationDto,
} from '@nx-fullstack-realworld/shared';

export const mockUser: User = {
  bio: 'mock bio',
  email: 'mock email',
  username: 'mock username',
  token: 'mock token',
  image: undefined,
};

export const mockUserRegistrationDto: UserRegistrationDto = {
  email: 'mock email',
  password: 'mock password',
  username: 'mock username',
};

export const mockErrorResponse: ErrorResponse = {
  errors: {
    error: ['mock'],
  },
};

export const mockError: ApiError = {
  error: 'error',
  statusCode: 400,
  message: ['error'],
};

export const mockHttpException: any = {
  error: mockErrorResponse,
};
