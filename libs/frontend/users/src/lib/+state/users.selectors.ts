import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, State, UsersPartialState } from './users.reducer';

// Lookup the 'Users' feature state managed by NgRx
export const getUsersState = createFeatureSelector<UsersPartialState, State>(
  USERS_FEATURE_KEY
);

export const getCurrentUser = createSelector(
  getUsersState,
  (state: State) => state.currentUser
);

export const getLoading = createSelector(
  getUsersState,
  (state: State) => state.loading === true
);

export const getCurrentErrors = createSelector(
  getUsersState,
  (state: State) => state.currentErrors
);
