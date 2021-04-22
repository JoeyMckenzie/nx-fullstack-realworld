import { createReducer, on, Action } from '@ngrx/store';
import {
  ApiError,
  ErrorCollection,
  isNullOrUndefined,
  Maybe,
  User,
} from '@nx-fullstack-realworld/shared';
import * as fromActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface State {
  loading: boolean;
  currentUser?: Maybe<User>;
  currentErrors?: Maybe<string[]>;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: State;
}

export const initialState: State = {
  loading: false,
};

export const flattenErrors = (errors: ErrorCollection): string[] => {
  const flattenedErrors: string[] = [];

  if (isNullOrUndefined(errors)) {
    return flattenedErrors;
  }

  for (let errorKey in errors!) {
    flattenedErrors.push(`${errorKey}: ${errors[errorKey]}`);
  }

  return flattenedErrors;
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
  on(fromActions.registerUserFailure, (state, { errors }) => ({
    ...state,
    loading: false,
    currentErrors: flattenErrors(errors),
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return usersReducer(state, action);
}
