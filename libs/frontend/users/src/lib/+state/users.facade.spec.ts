import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { UsersEffects } from './users.effects';
import { UsersFacade } from './users.facade';

import { USERS_FEATURE_KEY, State, reducer } from './users.reducer';
import { mockUserRegistrationDto } from './users.mock';
import { from } from 'rxjs';
import { exhaustMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';

interface TestSchema {
  users: State;
}

describe('UsersFacade', () => {
  let facade: UsersFacade;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(USERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([UsersEffects]),
        ],
        providers: [UsersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}

      TestBed.configureTestingModule({
        imports: [RootModule, HttpClientModule],
      });

      facade = TestBed.inject(UsersFacade);
    });

    it('register() should return empty list with loaded === true', (done) => {
      from(readFirst(facade.loading$))
        .pipe(
          withLatestFrom(readFirst(facade.currentError$)),
          exhaustMap(([loading, errors]) => {
            // Arrange
            expect(errors).toBeUndefined();
            expect(loading).toBe(false);

            // Act
            facade.register(mockUserRegistrationDto);

            // Assert, loading flag should be flipped with no errors
            return from(readFirst(facade.loading$)).pipe(
              withLatestFrom(readFirst(facade.currentError$)),
              map(([loading, errors]) => {
                expect(errors).toBeUndefined();
                expect(loading).toBe(true);
              })
            );
          })
        )
        .subscribe(() => done());
    });
  });
});
