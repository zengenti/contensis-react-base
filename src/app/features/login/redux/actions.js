import { action } from '~/core/util/helpers';
import {
  LOGIN_USER,
  LOGOUT_USER,
  // TOGGLE_LOGIN_MODE,
  CREATE_USER_ACCOUNT,
  // VALIDATE_USER,
} from './types';

export const loginUser = (username, password) =>
  action(LOGIN_USER, { username, password });
// export const validateUser = cookies => action(VALIDATE_USER, { cookies });
export const logoutUser = redirectPath => action(LOGOUT_USER, { redirectPath });
// export const toggleLoginMode = () => action(TOGGLE_LOGIN_MODE);
export const createUserAccount = (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
) =>
  action(CREATE_USER_ACCOUNT, {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });
