import { createAction, props } from '@ngrx/store';
import { ApiError, UserRegistrationRequest, UserRegistrationResponse } from '@nx-fullstack-realworld/shared'

export const registerUser = createAction('[Users] Sign in user', props<UserRegistrationRequest>());
export const registerUserSuccess = createAction('[Users] Sign in success', props<UserRegistrationResponse>());
export const registerUserFailure = createAction('[Users] Sign in failure', props<ApiError>());
