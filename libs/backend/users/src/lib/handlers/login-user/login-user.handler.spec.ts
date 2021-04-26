import { Test } from '@nestjs/testing';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { from } from 'rxjs';
import { LoginUserHandler } from './login-user.handler';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserRegistrationResponse } from '@nx-fullstack-realworld/shared';
import { AuthenticationService } from '../../services/authentication.service';
import { mockLoginCommand, mockUser, mockUserLoginResponse } from '../mocks';

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
            validatePassword: jest.fn(),
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

  it('should throw and exception when the user does not exist', (done) => {
    // Arrange
    const findFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockResolvedValue(null);

    // Act
    from(handler.execute(mockLoginCommand)).subscribe(
      () => {}, // Ignore the next value pushed out, only concerned about the error
      (response: HttpException) => {
        // Assert
        expect(findFirstSpy).toHaveBeenCalled();
        expect(response).not.toBeUndefined();
        expect(response.getStatus()).toBe(HttpStatus.NOT_FOUND);
        done();
      }
    );
  });

  it('should not login the user in and generate the token on a invalid login attempt', (done) => {
    // Arrange
    const findFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockResolvedValue(mockUser);

    const validateSpy = jest
      .spyOn(authenticationService, 'validatePassword')
      .mockReturnValue(false);

    // Act
    from(handler.execute(mockLoginCommand)).subscribe(
      () => {}, // Ignore the next value pushed out, only concerned about the error
      (response: HttpException) => {
        // Assert
        expect(response).not.toBeUndefined();
        expect(findFirstSpy).toHaveBeenCalled();
        expect(validateSpy).toHaveBeenCalled();
        expect(response.getStatus()).toBe(HttpStatus.UNAUTHORIZED);
        expect(authenticationService.generateToken).not.toHaveBeenCalled();
        done();
      }
    );
  });

  it('should login the user in and generate the token on a valid login attempt', (done) => {
    // Arrange
    const findFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockResolvedValue(mockUser);

    const validateSpy = jest
      .spyOn(authenticationService, 'validatePassword')
      .mockReturnValue(true);

    const tokenSpy = jest
      .spyOn(authenticationService, 'generateToken')
      .mockReturnValue('mock token');

    // Act
    from(handler.execute(mockLoginCommand)).subscribe(
      (response: UserRegistrationResponse) => {
        // Assert
        expect(response).toStrictEqual(mockUserLoginResponse);
        expect(findFirstSpy).toHaveBeenCalled();
        expect(validateSpy).toHaveBeenCalled();
        expect(authenticationService.generateToken).toHaveBeenCalled();
        done();
      }
    );
  });
});
