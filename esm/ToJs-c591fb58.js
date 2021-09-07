import React from 'react';
import { Map, Iterable } from 'immutable';

const selectUserIsLoading = state => {
  return state.getIn(['user', 'authenticationState', 'loading']);
};
const selectUserIsAuthenticated = state => {
  return state.getIn(['user', 'authenticationState', 'authenticated']) && state.getIn(['user']) != null;
};
const selectUserAuthenticationError = state => {
  return state.getIn(['user', 'authenticationState', 'authenticationError']);
};
const selectUserAuthenticationErrorMessage = state => {
  return state.getIn(['user', 'authenticationState', 'authenticationErrorMessage']);
};
const selectUserError = state => {
  return state.getIn(['user', 'authenticationState', 'error']);
};
const selectUserErrorMessage = state => {
  return state.getIn(['user', 'authenticationState', 'errorMessage']);
};
const selectClientCredentials = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials']);
};
const selectUser = state => {
  return state.getIn(['user']);
};
const selectUserIsZengentiStaff = state => {
  return state.getIn(['user', 'isZengentiStaff']);
};
const selectUserGuid = state => {
  return state.getIn(['user', 'id']);
};
const selectUsername = state => {
  return state.getIn(['user', 'username']);
};
const selectUserEmail = state => {
  return state.getIn(['user', 'email']);
};
const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
const selectUserSecurityToken = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials', 'contensisClassicToken']);
};
const selectUserRegistration = state => state.getIn(['user', 'registration'], Map());
const selectUserRegistrationError = state => state.getIn(['user', 'registration', 'error'], false);
const selectUserRegistrationIsLoading = state => state.getIn(['user', 'registration', 'loading'], false);
const selectUserRegistrationIsSuccess = state => state.getIn(['user', 'registration', 'success'], false);
const selectPasswordResetRequestSending = state => {
  return state.getIn(['user', 'passwordResetRequest', 'isSending']);
};
const selectPasswordResetRequestSent = state => {
  return state.getIn(['user', 'passwordResetRequest', 'sent']);
};
const selectPasswordResetRequestError = state => {
  return state.getIn(['user', 'passwordResetRequest', 'error']);
};
const selectResetPasswordSending = state => {
  return state.getIn(['user', 'resetPassword', 'isSending']);
};
const selectResetPasswordSent = state => {
  return state.getIn(['user', 'resetPassword', 'sent']);
};
const selectResetPasswordError = state => {
  return state.getIn(['user', 'resetPassword', 'error']);
};
const selectChangePasswordSending = state => {
  return state.getIn(['user', 'changePassword', 'isSending']);
};
const selectChangePasswordSent = state => {
  return state.getIn(['user', 'changePassword', 'sent']);
};
const selectChangePasswordError = state => {
  return state.getIn(['user', 'changePassword', 'error']);
};

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

const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
};

export { selectUserIsAuthenticated as a, selectUserGroups as b, selectUserAuthenticationError as c, selectUserAuthenticationErrorMessage as d, selectUserError as e, selectUserErrorMessage as f, selectUserIsLoading as g, selectUser as h, selectUserRegistrationError as i, selectUserRegistrationIsLoading as j, selectUserRegistrationIsSuccess as k, selectUserRegistration as l, matchUserGroup as m, selectPasswordResetRequestSending as n, selectPasswordResetRequestSent as o, selectPasswordResetRequestError as p, selectResetPasswordSending as q, selectResetPasswordSent as r, selectClientCredentials as s, toJS as t, selectResetPasswordError as u, selectUserGuid as v, selectChangePasswordSending as w, selectChangePasswordSent as x, selectChangePasswordError as y, selectors as z };
//# sourceMappingURL=ToJs-c591fb58.js.map
