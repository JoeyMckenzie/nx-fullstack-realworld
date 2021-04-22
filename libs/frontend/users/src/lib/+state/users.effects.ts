import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ApiError, ErrorResponse } from '@nx-fullstack-realworld/shared';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

import { UsersService } from '../services/users.service';
import * as fromActions from './users.actions';

@Injectable()
export class UsersEffects {
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.registerUser),
      fetch({
        run: (action) => {
          return this.usersService
            .registerUser({
              email: action.email,
              username: action.username,
              password: action.password,
            })
            .pipe(map((response) => fromActions.registerUserSuccess(response)));
        },
        onError: (_, error) =>
          fromActions.registerUserFailure({
            errors: (error.error as ErrorResponse).errors,
          }),
      })
    )
  );

  registerUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.registerUserSuccess),
      fetch({
        run: (action) => {
          this.storageService.setToken(action.token);
          this.router.navigateByUrl('/');
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private router: Router,
    private storageService: LocalStorageService
  ) {}
}
