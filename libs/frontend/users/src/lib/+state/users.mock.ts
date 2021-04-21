import {
  ApiError,
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

export const mockError: ApiError = {
  errors: ['error'],
};
