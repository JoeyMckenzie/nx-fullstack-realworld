import { createReducer, on, Action } from '@ngrx/store';
import { ApiError, Maybe, User } from '@nx-fullstack-realworld/shared';
import * as fromActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface State {
  loading: boolean;
  currentUser?: Maybe<User>;
  currentError?: Maybe<string[]>;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
};

const usersReducer = createReducer(
  initialState,
  on(fromActions.registerUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    fromActions.registerUserSuccess,
    (state, { bio, email, token, username, image }) => ({
      ...state,
      loading: false,
      currentUser: {
        bio,
        email,
        token,
        username,
        image,
      },
    })
  ),
  on(fromActions.registerUserFailure, (state, errors) => ({
    ...state,
    loading: false,
    currentError: errors.errors,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
