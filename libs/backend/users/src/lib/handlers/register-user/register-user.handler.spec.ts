import { Test } from '@nestjs/testing';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { from } from 'rxjs';
import { RegisterUserHandler } from './register-user.handler';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserRegistrationResponse } from '@nx-fullstack-realworld/shared';
import { AuthenticationService } from '../../services/authentication.service';
import {
  mockRegisterCommand,
  mockUser,
  mockUserRegisterResponse,
} from '../mocks';

describe(RegisterUserHandler.name, () => {
  let handler: RegisterUserHandler;
  let authenticationService: AuthenticationService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RegisterUserHandler,
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

    handler = module.get(RegisterUserHandler);
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
    from(handler.execute(mockRegisterCommand)).subscribe(
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

    const generatePasswordWithSaltSpy = jest
      .spyOn(authenticationService, 'generateHashedPasswordWithSalt')
      .mockReturnValue({ salt: 'mock salt', password: 'mock password' });

    const createSpy = jest
      .spyOn(prismaService.users, 'create')
      .mockResolvedValue(mockUser);

    const tokenSpy = jest
      .spyOn(authenticationService, 'generateToken')
      .mockReturnValue('mock token');

    // Act
    from(handler.execute(mockRegisterCommand)).subscribe(
      (response: UserRegistrationResponse) => {
        // Assert
        expect(response).toStrictEqual(mockUserRegisterResponse);
        expect(findFirstSpy).toHaveBeenCalled();
        expect(createSpy).toHaveBeenCalled();
        expect(generatePasswordWithSaltSpy).toHaveBeenCalled();
        expect(tokenSpy).toHaveBeenCalled();
        done();
      }
    );
  });
});
