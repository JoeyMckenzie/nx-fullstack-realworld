import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

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
        onError: (action, error) => {
          // console.error(`Error registering user ${action.username}`, error);
          return fromActions.registerUserFailure(error);
        },
      })
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
