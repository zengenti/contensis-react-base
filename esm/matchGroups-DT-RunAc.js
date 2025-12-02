import { g as getImmutableOrJS } from './selectors-PJo8AWy0.js';

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

export { selectUserIsAuthenticationError as a, selectUser as b, selectUserIsLoading as c, selectUserIsAuthenticated as d, selectUserErrorMessage as e, selectUserRegistration as f, selectUserRegistrationIsSuccess as g, selectUserRegistrationIsLoading as h, selectUserRegistrationError as i, selectors as j, selectUserGroups as k, selectClientCredentials as l, matchUserGroup as m, selectResetPasswordError as n, selectResetPasswordSent as o, selectResetPasswordSending as p, selectPasswordResetRequestError as q, selectPasswordResetRequestSent as r, selectUserIsError as s, selectPasswordResetRequestSending as t, selectChangePasswordError as u, selectUserGuid as v, selectChangePasswordSent as w, selectChangePasswordSending as x };
//# sourceMappingURL=matchGroups-DT-RunAc.js.map
