import { List, Map, fromJS } from 'immutable';
import {
  UPDATE_USER,
  TOGGLE_LOGIN_MODE,
  SET_RECAPTCHA_RESPONSE,
} from './types';

export const initialUserState = Map({
  loggedIn: false,
  failedLogin: null,
  username: null,
  id: null,
  securityToken: null,
  logonResult: null,
  registrationResult: null,
  groups: new List([]),
  emailAddress: null,
  fullName: null,
  loginScreenMode: 'login',
  passwordReset: false,
  passwordResetMessage: null,
  changePasswordMessage: null,
  recaptchaKey: RECAPTCHA_KEY /* global RECAPTCHA_KEY */,
  settings: fromJS({
    recaptcha: { response: { isHuman: false, token: null } },
  }),
});

export default (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      const { user } = action;
      return state
        .set(
          'loggedIn',
          user.loggedIn != 'undefined' ? user.loggedIn : state.get('loggedIn')
        )
        .set(
          'failedLogin',
          user.failedLogin != 'undefined'
            ? user.failedLogin
            : state.get('failedLogin')
        )
        .set('username', user.username || state.get('username'))
        .set('id', user.id || state.get('id'))
        .set('securityToken', user.securityToken || state.get('securityToken'))
        .set('logonResult', user.logonResult || state.get('logonResult'))
        .set(
          'registrationResult',
          user.registrationResult || state.get('registrationResult')
        )
        .set('groups', fromJS(user.groups) || state.get('groups'))
        .set('emailAddress', user.emailAddress || state.get('emailAddress'))
        .set('fullName', user.fullName || state.get('fullName'));
    }

    case TOGGLE_LOGIN_MODE: {
      const newMode = action.loginMode;
      return state.set('loginScreenMode', newMode);
    }
    case SET_RECAPTCHA_RESPONSE: {
      const settings = {
        recaptcha: {
          response: { isHuman: action.isHuman, token: action.token },
        },
      };
      return state.set('settings', fromJS(settings));
    }
    default:
      return state;
  }
};
