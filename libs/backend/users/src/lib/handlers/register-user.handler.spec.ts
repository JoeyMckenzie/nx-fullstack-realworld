import { Test } from '@nestjs/testing';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { from } from 'rxjs';
import { RegisterUserCommand } from '../commands';
import { TokenService } from '../services/token.service';
import { RegisterUserHandler } from './register-user.handler';
import { TestScheduler } from 'rxjs/testing';
import { Users } from '.prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockCommand = new RegisterUserCommand(
  'mock email',
  'mock username',
  'mock password'
);

const mockUser: Users = {
  id: 'mock id',
  bio: 'mock bio',
  email: 'email',
  password: 'mock password',
  username: 'mock username',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toStrictEqual(expected);
});

describe(RegisterUserHandler.name, () => {
  let handler: RegisterUserHandler;
  let tokenService: TokenService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RegisterUserHandler,
        {
          provide: TokenService,
          useValue: {
            generateToken: jest.fn(),
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
    tokenService = module.get(TokenService);
    prismaService = module.get(PrismaService);
  });

  it('should create the handler correctly', () => {
    expect(handler).toBeTruthy();
  });

  it('should throw and exception when already user exists', (done) => {
    // Arrange
    const prismaFindFirstSpy = jest
      .spyOn(prismaService.users, 'findFirst')
      .mockResolvedValue(mockUser);

    // Act
    from(handler.execute(mockCommand)).subscribe(
      () => {}, // Ignore the next value pushed out, only concerned about the error
      (response: HttpException) => {
        expect(prismaFindFirstSpy).toHaveBeenCalled();
        expect(response).not.toBeUndefined();
        expect(response.getStatus()).toBe(HttpStatus.BAD_REQUEST);
        done();
      }
    );
  });
});
