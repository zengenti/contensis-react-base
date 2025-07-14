'use strict';

<<<<<<< HEAD:cjs/ToJs-a8d8f3f0.js
var selectors$1 = require('./selectors-14caa813.js');
=======
var selectors$1 = require('./selectors-wCs5fHD4.js');
>>>>>>> master:cjs/ToJs-C9jwV7YB.js
var React = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefault(React);

const selectUserIsLoading = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'isLoading']);
const selectUserIsAuthenticated = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'isAuthenticated']);
const selectUserIsAuthenticationError = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'isAuthenticationError']);
const selectUserIsError = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'isError']);
/**
 * DEPRECATED 12/2021 - use selectUserErrorMessage instead
 * @param state AppState
 * @returns string
 */

const selectUserAuthenticationErrorMessage = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'errorMessage']);
const selectUserErrorMessage = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'errorMessage']);
const selectClientCredentials = (state, returnType) => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'clientCredentials'], {}, returnType);
const selectUser = (state, returnType) => selectors$1.getImmutableOrJS(state, 'user', {}, returnType);
const selectUserIsZengentiStaff = state => selectors$1.getImmutableOrJS(state, ['user', 'isZengentiStaff']);
const selectUserGuid = state => selectors$1.getImmutableOrJS(state, ['user', 'id']);
const selectUsername = state => selectors$1.getImmutableOrJS(state, ['user', 'username']);
const selectUserEmail = state => selectors$1.getImmutableOrJS(state, ['user', 'email']);
const selectUserGroups = (state, returnType) => selectors$1.getImmutableOrJS(state, ['user', 'groups'], [], returnType);
const selectUserSecurityToken = state => selectors$1.getImmutableOrJS(state, ['user', 'authenticationState', 'clientCredentials', 'contensisClassicToken']);
const selectUserRegistration = (state, returnType) => selectors$1.getImmutableOrJS(state, ['user', 'registration'], {}, returnType);
const selectUserRegistrationError = state => selectors$1.getImmutableOrJS(state, ['user', 'registration', 'error'], false);
const selectUserRegistrationIsLoading = state => selectors$1.getImmutableOrJS(state, ['user', 'registration', 'isLoading'], false);
const selectUserRegistrationIsSuccess = state => selectors$1.getImmutableOrJS(state, ['user', 'registration', 'success'], false);
const selectPasswordResetRequestSending = state => selectors$1.getImmutableOrJS(state, ['user', 'passwordResetRequest', 'isSending']);
const selectPasswordResetRequestSent = state => selectors$1.getImmutableOrJS(state, ['user', 'passwordResetRequest', 'sent']);
const selectPasswordResetRequestError = state => selectors$1.getImmutableOrJS(state, ['user', 'passwordResetRequest', 'error']);
const selectResetPasswordSending = state => selectors$1.getImmutableOrJS(state, ['user', 'resetPassword', 'isSending']);
const selectResetPasswordSent = state => selectors$1.getImmutableOrJS(state, ['user', 'resetPassword', 'sent']);
const selectResetPasswordError = state => selectors$1.getImmutableOrJS(state, ['user', 'resetPassword', 'error']);
const selectChangePasswordSending = state => selectors$1.getImmutableOrJS(state, ['user', 'changePassword', 'isSending']);
const selectChangePasswordSent = state => selectors$1.getImmutableOrJS(state, ['user', 'changePassword', 'sent']);
const selectChangePasswordError = state => selectors$1.getImmutableOrJS(state, ['user', 'changePassword', 'error']);

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectChangePasswordError: selectChangePasswordError,
  selectChangePasswordSending: selectChangePasswordSending,
  selectChangePasswordSent: selectChangePasswordSent,
  selectClientCredentials: selectClientCredentials,
  selectPasswordResetRequestError: selectPasswordResetRequestError,
  selectPasswordResetRequestSending: selectPasswordResetRequestSending,
  selectPasswordResetRequestSent: selectPasswordResetRequestSent,
  selectResetPasswordError: selectResetPasswordError,
  selectResetPasswordSending: selectResetPasswordSending,
  selectResetPasswordSent: selectResetPasswordSent,
  selectUser: selectUser,
  selectUserAuthenticationErrorMessage: selectUserAuthenticationErrorMessage,
  selectUserEmail: selectUserEmail,
  selectUserErrorMessage: selectUserErrorMessage,
  selectUserGroups: selectUserGroups,
  selectUserGuid: selectUserGuid,
  selectUserIsAuthenticated: selectUserIsAuthenticated,
  selectUserIsAuthenticationError: selectUserIsAuthenticationError,
  selectUserIsError: selectUserIsError,
  selectUserIsLoading: selectUserIsLoading,
  selectUserIsZengentiStaff: selectUserIsZengentiStaff,
  selectUserRegistration: selectUserRegistration,
  selectUserRegistrationError: selectUserRegistrationError,
  selectUserRegistrationIsLoading: selectUserRegistrationIsLoading,
  selectUserRegistrationIsSuccess: selectUserRegistrationIsSuccess,
  selectUserSecurityToken: selectUserSecurityToken,
  selectUsername: selectUsername
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

<<<<<<< HEAD:cjs/ToJs-a8d8f3f0.js
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

=======
>>>>>>> master:cjs/ToJs-C9jwV7YB.js
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/naming-convention */
const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    const propKey = wrappedComponentProp[KEY];
    const propValue = wrappedComponentProp[VALUE];
    newProps[propKey] = propValue && typeof propValue === 'object' && 'toJS' in propValue ? propValue.toJS() : propValue;
    return newProps;
  }, {});
  return /*#__PURE__*/React__default.default.createElement(WrappedComponent, propsJS);
};

exports.matchUserGroup = matchUserGroup;
exports.selectChangePasswordError = selectChangePasswordError;
exports.selectChangePasswordSending = selectChangePasswordSending;
exports.selectChangePasswordSent = selectChangePasswordSent;
exports.selectClientCredentials = selectClientCredentials;
exports.selectPasswordResetRequestError = selectPasswordResetRequestError;
exports.selectPasswordResetRequestSending = selectPasswordResetRequestSending;
exports.selectPasswordResetRequestSent = selectPasswordResetRequestSent;
exports.selectResetPasswordError = selectResetPasswordError;
exports.selectResetPasswordSending = selectResetPasswordSending;
exports.selectResetPasswordSent = selectResetPasswordSent;
exports.selectUser = selectUser;
exports.selectUserErrorMessage = selectUserErrorMessage;
exports.selectUserGroups = selectUserGroups;
exports.selectUserGuid = selectUserGuid;
exports.selectUserIsAuthenticated = selectUserIsAuthenticated;
exports.selectUserIsAuthenticationError = selectUserIsAuthenticationError;
exports.selectUserIsError = selectUserIsError;
exports.selectUserIsLoading = selectUserIsLoading;
exports.selectUserRegistration = selectUserRegistration;
exports.selectUserRegistrationError = selectUserRegistrationError;
exports.selectUserRegistrationIsLoading = selectUserRegistrationIsLoading;
exports.selectUserRegistrationIsSuccess = selectUserRegistrationIsSuccess;
exports.selectors = selectors;
exports.toJS = toJS;
<<<<<<< HEAD:cjs/ToJs-a8d8f3f0.js
//# sourceMappingURL=ToJs-a8d8f3f0.js.map
=======
//# sourceMappingURL=ToJs-C9jwV7YB.js.map
>>>>>>> master:cjs/ToJs-C9jwV7YB.js
