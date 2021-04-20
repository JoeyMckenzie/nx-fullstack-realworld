import { TestBed, async } from '@angular/core/testing';

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

describe(UsersEffects.name, () => {
  let actions: Observable<any>;
  let effects: UsersEffects;
  let usersService: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UsersEffects,
        DataPersistence,
        {
          provide: UsersService,
          useValue: {
            registerUser: jest.fn(),
          },
        },
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsersEffects);
    usersService = TestBed.inject(UsersService);
  });

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
      const expectedError: ApiError = { errors: ['error'] };
      const responseError = cold('-#-', undefined, expectedError);
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
        b: fromActions.registerUserFailure(expectedError),
      });

      // Assert
      expect(effects.registerUser$).toBeObservable(expected);
      expect(registerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
