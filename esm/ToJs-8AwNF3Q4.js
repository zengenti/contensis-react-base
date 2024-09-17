import { g as getImmutableOrJS } from './selectors-CAjGfIyu.js';
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
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
};

export { selectUserIsAuthenticated as a, selectUserIsAuthenticationError as b, selectUserIsError as c, selectUserIsLoading as d, selectUser as e, selectUserRegistrationError as f, selectUserRegistrationIsLoading as g, selectUserRegistrationIsSuccess as h, selectUserRegistration as i, selectors as j, selectUserGroups as k, selectClientCredentials as l, matchUserGroup as m, selectPasswordResetRequestSending as n, selectPasswordResetRequestSent as o, selectPasswordResetRequestError as p, selectResetPasswordSending as q, selectResetPasswordSent as r, selectUserErrorMessage as s, toJS as t, selectResetPasswordError as u, selectChangePasswordSending as v, selectChangePasswordSent as w, selectUserGuid as x, selectChangePasswordError as y };
//# sourceMappingURL=ToJs-8AwNF3Q4.js.map
