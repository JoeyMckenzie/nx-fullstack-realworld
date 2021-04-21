import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  UserRegistrationDto,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';

export const registerUser = createAction(
  '[Users] Register user',
  props<UserRegistrationDto>()
);
export const registerUserSuccess = createAction(
  '[Users] Register user success',
  props<UserRegistrationResponse>()
);
export const registerUserFailure = createAction(
  '[Users] Register user failure',
  props<ApiError>()
);
