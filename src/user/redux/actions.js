import { action } from '~/redux/util';
import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';

export const loginUser = (username, password) =>
  action(LOGIN_USER, { username, password });

export const logoutUser = redirectPath => action(LOGOUT_USER, { redirectPath });

export const registerUser = (user, mappers) =>
  action(REGISTER_USER, {
    user,
    mappers,
  });
