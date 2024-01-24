import { g as getImmutableOrJS } from './selectors-691caf02.js';
import React from 'react';

const selectUserIsLoading = state => getImmutableOrJS(state, ['user', 'authenticationState', 'isLoading']);
const selectUserIsAuthenticated = state => getImmutableOrJS(state, ['user', 'authenticationState', 'isAuthenticated']);
const selectUserIsAuthenticationError = state => getImmutableOrJS(state, ['user', 'authenticationState', 'isAuthenticationError']);
const selectUserIsError = state => getImmutableOrJS(state, ['user', 'authenticationState', 'isError']);
/**
 * DEPRECATED 12/2021 - use selectUserErrorMessage instead
 * @param state AppState
 * @returns string
 */

const selectUserAuthenticationErrorMessage = state => getImmutableOrJS(state, ['user', 'authenticationState', 'errorMessage']);
const selectUserErrorMessage = state => getImmutableOrJS(state, ['user', 'authenticationState', 'errorMessage']);
const selectClientCredentials = (state, returnType) => getImmutableOrJS(state, ['user', 'authenticationState', 'clientCredentials'], {}, returnType);
const selectUser = (state, returnType) => getImmutableOrJS(state, 'user', {}, returnType);
const selectUserIsZengentiStaff = state => getImmutableOrJS(state, ['user', 'isZengentiStaff']);
const selectUserGuid = state => getImmutableOrJS(state, ['user', 'id']);
const selectUsername = state => getImmutableOrJS(state, ['user', 'username']);
const selectUserEmail = state => getImmutableOrJS(state, ['user', 'email']);
const selectUserGroups = (state, returnType) => getImmutableOrJS(state, ['user', 'groups'], [], returnType);
const selectUserSecurityToken = state => getImmutableOrJS(state, ['user', 'authenticationState', 'clientCredentials', 'contensisClassicToken']);
const selectUserRegistration = (state, returnType) => getImmutableOrJS(state, ['user', 'registration'], {}, returnType);
const selectUserRegistrationError = state => getImmutableOrJS(state, ['user', 'registration', 'error'], false);
const selectUserRegistrationIsLoading = state => getImmutableOrJS(state, ['user', 'registration', 'isLoading'], false);
const selectUserRegistrationIsSuccess = state => getImmutableOrJS(state, ['user', 'registration', 'success'], false);
const selectPasswordResetRequestSending = state => getImmutableOrJS(state, ['user', 'passwordResetRequest', 'isSending']);
const selectPasswordResetRequestSent = state => getImmutableOrJS(state, ['user', 'passwordResetRequest', 'sent']);
const selectPasswordResetRequestError = state => getImmutableOrJS(state, ['user', 'passwordResetRequest', 'error']);
const selectResetPasswordSending = state => getImmutableOrJS(state, ['user', 'resetPassword', 'isSending']);
const selectResetPasswordSent = state => getImmutableOrJS(state, ['user', 'resetPassword', 'sent']);
const selectResetPasswordError = state => getImmutableOrJS(state, ['user', 'resetPassword', 'error']);
const selectChangePasswordSending = state => getImmutableOrJS(state, ['user', 'changePassword', 'isSending']);
const selectChangePasswordSent = state => getImmutableOrJS(state, ['user', 'changePassword', 'sent']);
const selectChangePasswordError = state => getImmutableOrJS(state, ['user', 'changePassword', 'error']);

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectUserIsLoading: selectUserIsLoading,
  selectUserIsAuthenticated: selectUserIsAuthenticated,
  selectUserIsAuthenticationError: selectUserIsAuthenticationError,
  selectUserIsError: selectUserIsError,
  selectUserAuthenticationErrorMessage: selectUserAuthenticationErrorMessage,
  selectUserErrorMessage: selectUserErrorMessage,
  selectClientCredentials: selectClientCredentials,
  selectUser: selectUser,
  selectUserIsZengentiStaff: selectUserIsZengentiStaff,
  selectUserGuid: selectUserGuid,
  selectUsername: selectUsername,
  selectUserEmail: selectUserEmail,
  selectUserGroups: selectUserGroups,
  selectUserSecurityToken: selectUserSecurityToken,
  selectUserRegistration: selectUserRegistration,
  selectUserRegistrationError: selectUserRegistrationError,
  selectUserRegistrationIsLoading: selectUserRegistrationIsLoading,
  selectUserRegistrationIsSuccess: selectUserRegistrationIsSuccess,
  selectPasswordResetRequestSending: selectPasswordResetRequestSending,
  selectPasswordResetRequestSent: selectPasswordResetRequestSent,
  selectPasswordResetRequestError: selectPasswordResetRequestError,
  selectResetPasswordSending: selectResetPasswordSending,
  selectResetPasswordSent: selectResetPasswordSent,
  selectResetPasswordError: selectResetPasswordError,
  selectChangePasswordSending: selectChangePasswordSending,
  selectChangePasswordSent: selectChangePasswordSent,
  selectChangePasswordError: selectChangePasswordError
});

const matchUserGroup = (userGroups = [], requiredGroups = []) => {
  if (!Array.isArray(requiredGroups) || Array.isArray(requiredGroups) && requiredGroups.length === 0) return true;
  const groupMatch = requiredGroups.some(requiredGroup => {
    return userGroups.some(userGroup => {
      if (requiredGroup.id === userGroup.id) {
        return true;
      }

      if (requiredGroup.name === userGroup.name) {
        return true;
      }
    });
  });
  return groupMatch;
};

const COOKIE_VALID_DAYS = 1; // 0 = Session cookie

// CookieHelper is a class that takes in and lets us pass around the methods provided
// by `useCookie` react hook in backend code that is connected to the universal-cookies
// instance created in SSR middleware (and provides browser cookies)
class CookieHelper {
  get raw() {
    return this.cookies;
  }

  constructor(cookies, setCookie, removeCookie) {
    this.cookies = void 0;
    this.setCookie = void 0;
    this.removeCookie = void 0;
    this.cookies = cookies;
    this.setCookie = setCookie;
    this.removeCookie = removeCookie;
  }

  GetCookie(name) {
    const cookie = this.cookies[name];

    if (typeof cookie === 'undefined') {
      return null;
    }

    return cookie;
  }

  SetCookie(name, value, maxAgeDays = COOKIE_VALID_DAYS) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    this.cookies[name] = value; // call the passed setCookie method so we can update the `universal-cookie` instance
    // with the change listener attached so the cookies can be set in SSR response

    if (maxAgeDays === 0) this.setCookie(name, value);else this.setCookie(name, value, {
      expires: addDays(new Date(), maxAgeDays)
    });
  }

  DeleteCookie(name) {
    // update local cookies object as this is provided as a clone of `req.universalCookies`
    delete this.cookies[name];
    this.removeCookie(name);
  }

}

const addDays = (date = new Date(), days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/* eslint-disable react/display-name */
const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    const propKey = wrappedComponentProp[KEY];
    const propValue = wrappedComponentProp[VALUE];
    newProps[propKey] = propValue && typeof propValue === 'object' && 'toJS' in propValue ? propValue.toJS() : propValue;
    return newProps;
  }, {});
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
};

export { CookieHelper as C, selectUserIsAuthenticated as a, selectUserGroups as b, selectUserErrorMessage as c, selectUserIsAuthenticationError as d, selectUserIsError as e, selectUserIsLoading as f, selectUser as g, selectUserRegistrationError as h, selectUserRegistrationIsLoading as i, selectUserRegistrationIsSuccess as j, selectUserRegistration as k, selectPasswordResetRequestSending as l, matchUserGroup as m, selectPasswordResetRequestSent as n, selectPasswordResetRequestError as o, selectResetPasswordSending as p, selectResetPasswordSent as q, selectResetPasswordError as r, selectClientCredentials as s, toJS as t, selectChangePasswordSending as u, selectChangePasswordSent as v, selectUserGuid as w, selectChangePasswordError as x, selectors as y };
//# sourceMappingURL=ToJs-df57f31d.js.map
