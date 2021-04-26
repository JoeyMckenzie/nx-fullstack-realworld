import { Test } from '@nestjs/testing';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { from } from 'rxjs';
import { LoginUserCommand } from '../commands';
import { LoginUserHandler } from './login-user.handler';
import { TestScheduler } from 'rxjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  UserLoginResponse,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { Users } from '@prisma/client';
import { AuthenticationService } from '../services/authentication.service';

const mockCommand = new LoginUserCommand('mock email', 'mock password');

const mockUser: Users = {
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

const mockUserResponse: UserLoginResponse = {
  bio: 'mock bio',
  email: 'mock email',
  username: 'mock username',
  image: 'mock image',
  token: 'mock token',
};

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toStrictEqual(expected);
});

describe(LoginUserHandler.name, () => {
  let handler: LoginUserHandler;
  let authenticationService: AuthenticationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUserHandler,
        {
          provide: AuthenticationService,
          useValue: {
            generateToken: jest.fn(),
            generateHashedPasswordWithSalt: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            users: {
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    handler = module.get(LoginUserHandler);
    authenticationService = module.get(AuthenticationService);
    prismaService = module.get(PrismaService);
  });

  it('should create the handler correctly', () => {
    expect(handler).toBeTruthy();
  });

  it('should throw and exception when already user exists', (done) => {
    // Arrange
    const findFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockResolvedValue(mockUser);

    // Act
    from(handler.execute(mockCommand)).subscribe(
      () => {}, // Ignore the next value pushed out, only concerned about the error
      (response: HttpException) => {
        // Assert
        expect(findFirstSpy).toHaveBeenCalled();
        expect(response).not.toBeUndefined();
        expect(response.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        done();
      }
    );
  });

  it('should create the user when none is found', (done) => {
    // Arrange
    const findFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockResolvedValue(null);

    const createSpy = jest
      .spyOn(prismaService.users, 'create')
      .mockResolvedValue(mockUser);

    const tokenSpy = jest
      .spyOn(authenticationService, 'generateToken')
      .mockReturnValue('mock token');

    // Act
    from(handler.execute(mockCommand)).subscribe(
      (response: UserRegistrationResponse) => {
        // Assert
        expect(response).toStrictEqual(mockUserResponse);
        expect(findFirstSpy).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalled();
        expect(tokenSpy).toHaveBeenCalled();
        done();
      }
    );
  });
});