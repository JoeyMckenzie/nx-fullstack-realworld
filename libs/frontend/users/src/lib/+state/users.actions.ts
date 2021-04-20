import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';

export const registerUser = createAction(
  '[Users] Register user',
  props<UserRegistrationRequest>()
);
export const registerUserSuccess = createAction(
  '[Users] Register user success',
  props<UserRegistrationResponse>()
);
export const registerUserFailure = createAction(
  '[Users] Register user failure',
  props<ApiError>()
);
