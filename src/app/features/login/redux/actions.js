import { action } from '~/core/util/helpers';
import {
  CHANGE_USER_PASSWORD,
  CREATE_USER_ACCOUNT,
  FORGOT_USER_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_LOGIN_MODE,
  SET_RECAPTCHA_RESPONSE,
  VALIDATE_USER,
} from './types';

export const loginUser = (username, password) =>
  action(LOGIN_USER, { username, password });
export const validateUser = cookies => action(VALIDATE_USER, { cookies });
export const logoutUser = () => action(LOGOUT_USER);

export const toggleLoginMode = loginMode =>
  action(TOGGLE_LOGIN_MODE, { loginMode });
export const createUserAccount = () => action(CREATE_USER_ACCOUNT);
export const forgotPassword = username =>
  action(FORGOT_USER_PASSWORD, { username });
export const changePassword = (oldPassword, newPassword, newPasswordConfirm) =>
  action(CHANGE_USER_PASSWORD, {
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });
export const changePasswordWithToken = (
  token,
  newPassword,
  newPasswordConfirm
) => action(CHANGE_USER_PASSWORD, { token, newPassword, newPasswordConfirm });
export const setRecaptchaResponse = (isHuman, token) =>
  action(SET_RECAPTCHA_RESPONSE, { isHuman, token });
