import {
  UserLoginResponse,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { Users } from '@prisma/client';
import { LoginUserCommand, RegisterUserCommand } from '../commands';

export const mockRegisterCommand = new RegisterUserCommand(
  'mock email',
  'mock username',
  'mock password'
);

export const mockLoginCommand = new LoginUserCommand(
  'mock email',
  'mock password'
);

export const mockUser: Users = {
  id: 'mock id',
  bio: 'mock bio',
  email: 'mock email',
  password: 'mock password',
  salt: 'mock salt',
  username: 'mock username',
  image: 'mock image',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserRegisterResponse: UserRegistrationResponse = {
  bio: 'mock bio',
  email: 'mock email',
  username: 'mock username',
  image: 'mock image',
  token: 'mock token',
};

export const mockUserLoginResponse: UserLoginResponse = {
  bio: 'mock bio',
  email: 'mock email',
  username: 'mock username',
  image: 'mock image',
  token: 'mock token',
};
