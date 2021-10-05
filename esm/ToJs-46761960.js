import { g as getImmutableOrJS } from './selectors-8fca7fb2.js';
import React from 'react';

const selectUserIsLoading = state => getImmutableOrJS(state, ['authenticationState', 'loading']);
const selectUserIsAuthenticated = state => getImmutableOrJS(state, ['authenticationState', 'authenticated']);
const selectUserAuthenticationError = state => getImmutableOrJS(state, ['authenticationState', 'authenticationError']);
const selectUserAuthenticationErrorMessage = state => getImmutableOrJS(state, ['authenticationState', 'authenticationErrorMessage']);
const selectUserError = state => getImmutableOrJS(state, ['authenticationState', 'error']);
const selectUserErrorMessage = state => getImmutableOrJS(state, ['authenticationState', 'errorMessage']);
const selectClientCredentials = state => getImmutableOrJS(state, ['authenticationState', 'clientCredentials']);
const selectUser = state => getImmutableOrJS(state, 'user');
const selectUserIsZengentiStaff = state => getImmutableOrJS(state, ['isZengentiStaff']);
const selectUserGuid = state => getImmutableOrJS(state, ['id']);
const selectUsername = state => getImmutableOrJS(state, ['username']);
const selectUserEmail = state => getImmutableOrJS(state, ['email']);
const selectUserGroups = state => getImmutableOrJS(state, ['groups']);
const selectUserSecurityToken = state => getImmutableOrJS(state, ['authenticationState', 'clientCredentials', 'contensisClassicToken']);
const selectUserRegistration = state => getImmutableOrJS(state, ['registration'], {});
const selectUserRegistrationError = state => getImmutableOrJS(state, ['registration', 'error'], false);
const selectUserRegistrationIsLoading = state => getImmutableOrJS(state, ['registration', 'loading'], false);
const selectUserRegistrationIsSuccess = state => getImmutableOrJS(state, ['registration', 'success'], false);
const selectPasswordResetRequestSending = state => getImmutableOrJS(state, ['passwordResetRequest', 'isSending']);
const selectPasswordResetRequestSent = state => getImmutableOrJS(state, ['passwordResetRequest', 'sent']);
const selectPasswordResetRequestError = state => getImmutableOrJS(state, ['passwordResetRequest', 'error']);
const selectResetPasswordSending = state => getImmutableOrJS(state, ['resetPassword', 'isSending']);
const selectResetPasswordSent = state => getImmutableOrJS(state, ['resetPassword', 'sent']);
const selectResetPasswordError = state => getImmutableOrJS(state, ['resetPassword', 'error']);
const selectChangePasswordSending = state => getImmutableOrJS(state, ['changePassword', 'isSending']);
const selectChangePasswordSent = state => getImmutableOrJS(state, ['changePassword', 'sent']);
const selectChangePasswordError = state => getImmutableOrJS(state, ['changePassword', 'error']);

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectUserIsLoading: selectUserIsLoading,
  selectUserIsAuthenticated: selectUserIsAuthenticated,
  selectUserAuthenticationError: selectUserAuthenticationError,
  selectUserAuthenticationErrorMessage: selectUserAuthenticationErrorMessage,
  selectUserError: selectUserError,
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

export { selectUserIsAuthenticated as a, selectUserGroups as b, selectUserAuthenticationError as c, selectUserAuthenticationErrorMessage as d, selectUserError as e, selectUserErrorMessage as f, selectUserIsLoading as g, selectUser as h, selectUserRegistrationError as i, selectUserRegistrationIsLoading as j, selectUserRegistrationIsSuccess as k, selectUserRegistration as l, matchUserGroup as m, selectPasswordResetRequestSending as n, selectPasswordResetRequestSent as o, selectPasswordResetRequestError as p, selectResetPasswordSending as q, selectResetPasswordSent as r, selectClientCredentials as s, toJS as t, selectResetPasswordError as u, selectChangePasswordSending as v, selectChangePasswordSent as w, selectUserGuid as x, selectChangePasswordError as y, selectors as z };
//# sourceMappingURL=ToJs-46761960.js.map
