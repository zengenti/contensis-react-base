import { List, Map, fromJS } from 'immutable';
import {
  UPDATE_USER,
  TOGGLE_LOGIN_MODE,
  SET_RECAPTCHA_KEY,
  SET_RECAPTCHA_RESPONSE,
} from './types';

export const initialUserState = Map({
  loggedIn: false,
  failedLogin: null,
  username: null,
  id: null,
  securityToken: null,
  logonResult: null,
  groups: new List([]),
  emailAddress: null,
  fullName: null,
  loginScreenMode: 'login',
  passwordReset: false,
  passwordResetMessage: null,
  changePasswordMessage: null,
  recaptcha: new Map({
    key: null,
    response: new Map({ isHuman: false, token: null }),
  }),
});

export default (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      const { user } = action;
      return state
        .set(
          'loggedIn',
          typeof user.loggedIn !== 'undefined'
            ? user.loggedIn
            : state.get('loggedIn')
        )
        .set(
          'failedLogin',
          typeof user.failedLogin !== 'undefined'
            ? user.failedLogin
            : state.get('failedLogin')
        )
        .set('username', user.username || state.get('username'))
        .set('id', user.id || state.get('id'))
        .set('securityToken', user.securityToken || state.get('securityToken'))
        .set('logonResult', user.logonResult || state.get('logonResult'))
        .set('groups', fromJS(user.groups) || state.get('groups'))
        .set('emailAddress', user.emailAddress || state.get('emailAddress'))
        .set('fullName', user.fullName || state.get('fullName'))
        .set(
          'passwordReset',
          typeof user.passwordReset !== 'undefined'
            ? user.passwordReset
            : state.get('passwordReset')
        )
        .set(
          'passwordResetMessage',
          user.passwordResetMessage || state.get('passwordResetMessage')
        )
        .set(
          'changePasswordMessage',
          user.changePasswordMessage || state.get('changePasswordMessage')
        );
    }
    case TOGGLE_LOGIN_MODE: {
      const newMode = action.loginMode;
      return state.set('loginScreenMode', newMode);
    }
    case SET_RECAPTCHA_KEY: {
      return state.setIn(['recaptcha', 'key'], action.key);
    }
    case SET_RECAPTCHA_RESPONSE: {
      return state
        .setIn(['recaptcha', 'response', 'isHuman'], action.isHuman)
        .setIn(['recaptcha', 'response', 'token'], action.token);
    }
    default:
      return state;
  }
};
