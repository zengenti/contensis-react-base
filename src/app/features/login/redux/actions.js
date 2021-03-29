import { action } from '~/core/util/helpers';
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  REQUEST_USER_PASSWORD_RESET,
  RESET_USER_PASSWORD,
} from './types';

export const loginUser = (username, password) =>
  action(LOGIN_USER, { username, password });

export const logoutUser = redirectPath => action(LOGOUT_USER, { redirectPath });

export const registerUser = (user, mappers) =>
  action(REGISTER_USER, {
    user,
    mappers,
  });

export const requestPasswordReset = userEmailObject =>
  action(REQUEST_USER_PASSWORD_RESET, { userEmailObject });

export const resetPassword = resetPasswordObject =>
  action(RESET_USER_PASSWORD, { resetPasswordObject });
