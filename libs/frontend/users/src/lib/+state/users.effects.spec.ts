import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { cold, hot } from '@nrwl/angular/testing';

import { UsersEffects } from './users.effects';
import * as fromActions from './users.actions';
import {
  ApiError,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { UsersService } from '../services/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../services/local-storage.service';
import {
  mockError,
  mockErrorResponse,
  mockHttpException,
  mockUser,
  mockUserRegistrationDto,
} from './users.mock';
import { Router } from '@angular/router';

describe(UsersEffects.name, () => {
  let actions: Observable<any>;
  let effects: UsersEffects;
  let usersService: UsersService;
  let storageService: LocalStorageService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), RouterTestingModule],
      providers: [
        UsersEffects,
        DataPersistence,
        {
          provide: UsersService,
          useValue: {
            registerUser: jest.fn(),
          },
        },
        {
          provide: LocalStorageService,
          useValue: {
            setToken: jest.fn(),
          },
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: jest.fn(),
          },
        },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsersEffects);
    usersService = TestBed.inject(UsersService);
    storageService = TestBed.inject(LocalStorageService);
    router = TestBed.inject(Router);
  });

  afterEach(() => jest.clearAllMocks());

  describe('registerUser$', () => {
    it('should dispatch the success action when users service is successful', () => {
      // Arrange
      const marble = '-a-|';
      const expectedResponse: UserRegistrationResponse = {
        email: 'test',
        username: 'test',
        token: 'test',
        bio: '',
      };
      const registerSpy = jest
        .spyOn(usersService, 'registerUser')
        .mockReturnValue(of(expectedResponse));

      // Act
      actions = hot(marble, {
        a: fromActions.registerUser({
          email: expectedResponse.email,
          username: expectedResponse.username,
          password: 'test',
        }),
      });

      // Assert
      const expected = cold(marble, {
        a: fromActions.registerUserSuccess(expectedResponse),
      });

      expect(effects.registerUser$).toBeObservable(expected);
      expect(registerSpy).toHaveBeenCalledTimes(1);
    });

    it('should dispatch the failure action when users service returns an error', () => {
      // Arrange
      const responseError = cold('-#-', undefined, mockHttpException);
      const registerSpy = jest
        .spyOn(usersService, 'registerUser')
        .mockReturnValue(responseError);

      // Act
      actions = hot('-a-', {
        a: fromActions.registerUser({
          email: 'test',
          username: 'test',
          password: 'test',
        }),
      });

      const expected = cold('--b', {
        b: fromActions.registerUserFailure({
          errors: mockErrorResponse.errors,
        }),
      });

      // Assert
      expect(effects.registerUser$).toBeObservable(expected);
      expect(registerSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the token using the storage service on success', () => {
      // Arrange
      const setTokenSpy = jest.spyOn(storageService, 'setToken');
      const routerSpy = jest.spyOn(router, 'navigateByUrl');

      // Act
      actions = of(fromActions.registerUserSuccess(mockUser));

      // Assert
      effects.registerUserSuccess$.subscribe(() => {
        expect(setTokenSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalled();
      });
    });
  });
});
