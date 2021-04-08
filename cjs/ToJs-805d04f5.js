'use strict';

var React = require('react');
var immutable = require('immutable');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  return state.getIn(['user', 'userName']);
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
const selectUserRegistration = state => state.getIn(['user', 'registration'], immutable.Map());
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
    newProps[wrappedComponentProp[KEY]] = immutable.Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return React__default['default'].createElement(WrappedComponent, propsJS);
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
exports.selectUserAuthenticationError = selectUserAuthenticationError;
exports.selectUserAuthenticationErrorMessage = selectUserAuthenticationErrorMessage;
exports.selectUserError = selectUserError;
exports.selectUserErrorMessage = selectUserErrorMessage;
exports.selectUserGroups = selectUserGroups;
exports.selectUserGuid = selectUserGuid;
exports.selectUserIsAuthenticated = selectUserIsAuthenticated;
exports.selectUserIsLoading = selectUserIsLoading;
exports.selectUserRegistration = selectUserRegistration;
exports.selectUserRegistrationError = selectUserRegistrationError;
exports.selectUserRegistrationIsLoading = selectUserRegistrationIsLoading;
exports.selectUserRegistrationIsSuccess = selectUserRegistrationIsSuccess;
exports.selectors = selectors;
exports.toJS = toJS;
//# sourceMappingURL=ToJs-805d04f5.js.map
