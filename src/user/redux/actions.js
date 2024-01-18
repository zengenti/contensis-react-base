import { action } from '~/redux/util';
import {
  CHANGE_USER_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  REQUEST_USER_PASSWORD_RESET,
  RESET_USER_PASSWORD,
} from './types';

export const loginUser = (username, password, cookies) =>
  action(LOGIN_USER, { username, password, cookies });

export const logoutUser = (redirectPath, cookies) =>
  action(LOGOUT_USER, { redirectPath, cookies });

export const registerUser = (user, mappers) =>
  action(REGISTER_USER, {
    user,
    mappers,
  });

export const requestPasswordReset = userEmailObject =>
  action(REQUEST_USER_PASSWORD_RESET, { userEmailObject });

export const resetPassword = resetPasswordObject =>
  action(RESET_USER_PASSWORD, { resetPasswordObject });

export const changePassword = (userId, currentPassword, newPassword) =>
  action(CHANGE_USER_PASSWORD, { userId, currentPassword, newPassword });
