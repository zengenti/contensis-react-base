'use strict';

var selectors$1 = require('./selectors-e3f1fd85.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  return /*#__PURE__*/React__default["default"].createElement(WrappedComponent, propsJS);
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
//# sourceMappingURL=ToJs-7f965106.js.map
