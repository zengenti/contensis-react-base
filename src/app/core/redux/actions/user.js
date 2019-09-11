import { action } from 'app/util/helpers';
import {
  CHECK_USER_LOGGED_IN,
  TOGGLE_USER_DETAILS_ARE_HIDDEN,
  SHOW_USER_DETAILS,
  HIDE_USER_DETAILS,
  SIGN_OUT,
} from 'app/redux/types/user';

export const checkUserLoggedIn = () => action(CHECK_USER_LOGGED_IN);
export const toggleShowUserDetails = () =>
  action(TOGGLE_USER_DETAILS_ARE_HIDDEN);
export const showUserDetails = () => action(SHOW_USER_DETAILS);
export const hideUserDetails = () => action(HIDE_USER_DETAILS);
export const signout = () => action(SIGN_OUT);
