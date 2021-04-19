import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { UserRegistrationRequest } from "@nx-fullstack-realworld/shared";

import * as UserActions from './users.actions';
import * as fromUsers from './users.reducer';
import * as UsersSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  loading$ = this.store.pipe(select(UsersSelectors.isLoading));
  user$ = this.store.pipe(select(UsersSelectors.getUser));

  constructor(private store: Store<fromUsers.UsersPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  register(userRegistration: UserRegistrationRequest) {
    this.store.dispatch(UserActions.registerUser(userRegistration));
  }
}
