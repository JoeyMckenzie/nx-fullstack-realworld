import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { UserRegistrationRequest } from '@nx-fullstack-realworld/shared';

import * as fromActions from './users.actions';
import * as fromUsers from './users.reducer';
import * as fromSelectors from './users.selectors';

@Injectable()
export class UsersFacade {
  loading$ = this.store.pipe(select(fromSelectors.isLoading));
  currentError$ = this.store.pipe(select(fromSelectors.getCurrentError));

  constructor(private store: Store<fromUsers.UsersPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  register(userRegistration: UserRegistrationRequest) {
    this.store.dispatch(fromActions.registerUser(userRegistration));
  }
}
