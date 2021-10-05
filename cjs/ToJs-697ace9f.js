'use strict';

var selectors$1 = require('./selectors-0ec95076.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const selectUserIsLoading = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'loading']);
const selectUserIsAuthenticated = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'authenticated']);
const selectUserAuthenticationError = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'authenticationError']);
const selectUserAuthenticationErrorMessage = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'authenticationErrorMessage']);
const selectUserError = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'error']);
const selectUserErrorMessage = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'errorMessage']);
const selectClientCredentials = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'clientCredentials']);
const selectUser = state => selectors$1.getImmutableOrJS(state, 'user');
const selectUserIsZengentiStaff = state => selectors$1.getImmutableOrJS(state, ['isZengentiStaff']);
const selectUserGuid = state => selectors$1.getImmutableOrJS(state, ['id']);
const selectUsername = state => selectors$1.getImmutableOrJS(state, ['username']);
const selectUserEmail = state => selectors$1.getImmutableOrJS(state, ['email']);
const selectUserGroups = state => selectors$1.getImmutableOrJS(state, ['groups']);
const selectUserSecurityToken = state => selectors$1.getImmutableOrJS(state, ['authenticationState', 'clientCredentials', 'contensisClassicToken']);
const selectUserRegistration = state => selectors$1.getImmutableOrJS(state, ['registration'], {});
const selectUserRegistrationError = state => selectors$1.getImmutableOrJS(state, ['registration', 'error'], false);
const selectUserRegistrationIsLoading = state => selectors$1.getImmutableOrJS(state, ['registration', 'loading'], false);
const selectUserRegistrationIsSuccess = state => selectors$1.getImmutableOrJS(state, ['registration', 'success'], false);
const selectPasswordResetRequestSending = state => selectors$1.getImmutableOrJS(state, ['passwordResetRequest', 'isSending']);
const selectPasswordResetRequestSent = state => selectors$1.getImmutableOrJS(state, ['passwordResetRequest', 'sent']);
const selectPasswordResetRequestError = state => selectors$1.getImmutableOrJS(state, ['passwordResetRequest', 'error']);
const selectResetPasswordSending = state => selectors$1.getImmutableOrJS(state, ['resetPassword', 'isSending']);
const selectResetPasswordSent = state => selectors$1.getImmutableOrJS(state, ['resetPassword', 'sent']);
const selectResetPasswordError = state => selectors$1.getImmutableOrJS(state, ['resetPassword', 'error']);
const selectChangePasswordSending = state => selectors$1.getImmutableOrJS(state, ['changePassword', 'isSending']);
const selectChangePasswordSent = state => selectors$1.getImmutableOrJS(state, ['changePassword', 'sent']);
const selectChangePasswordError = state => selectors$1.getImmutableOrJS(state, ['changePassword', 'error']);

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
//# sourceMappingURL=ToJs-697ace9f.js.map
