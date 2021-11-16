import { AppState } from '~/redux/appstate';
import { getImmutableOrJS as getIn } from '~/redux/util';

export const selectUserIsLoading = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'loading']);

export const selectUserIsAuthenticated = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'authenticated']);

export const selectUserAuthenticationError = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'authenticationError']);

export const selectUserAuthenticationErrorMessage = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'authenticationErrorMessage']);

export const selectUserError = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'error']);

export const selectUserErrorMessage = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'errorMessage']);

export const selectClientCredentials = (state: AppState) =>
  getIn(state, ['user', 'authenticationState', 'clientCredentials']);

export const selectUser = (state: AppState) => getIn(state, 'user');

export const selectUserIsZengentiStaff = (state: AppState) =>
  getIn(state, ['user', 'isZengentiStaff']);

export const selectUserGuid = (state: AppState) => getIn(state, ['user', 'id']);

export const selectUsername = (state: AppState) =>
  getIn(state, ['user', 'username']);

export const selectUserEmail = (state: AppState) =>
  getIn(state, ['user', 'email']);

export const selectUserGroups = (state: AppState) =>
  getIn(state, ['user', 'groups']);

export const selectUserSecurityToken = (state: AppState) =>
  getIn(state, [
    'user',
    'authenticationState',
    'clientCredentials',
    'contensisClassicToken',
  ]);

export const selectUserRegistration = (state: AppState) =>
  getIn(state, ['user', 'registration'], {});

export const selectUserRegistrationError = (state: AppState) =>
  getIn(state, ['user', 'registration', 'error'], false);

export const selectUserRegistrationIsLoading = (state: AppState) =>
  getIn(state, ['user', 'registration', 'loading'], false);

export const selectUserRegistrationIsSuccess = (state: AppState) =>
  getIn(state, ['user', 'registration', 'success'], false);

export const selectPasswordResetRequestSending = (state: AppState) =>
  getIn(state, ['user', 'passwordResetRequest', 'isSending']);

export const selectPasswordResetRequestSent = (state: AppState) =>
  getIn(state, ['user', 'passwordResetRequest', 'sent']);

export const selectPasswordResetRequestError = (state: AppState) =>
  getIn(state, ['user', 'passwordResetRequest', 'error']);

export const selectResetPasswordSending = (state: AppState) =>
  getIn(state, ['user', 'resetPassword', 'isSending']);

export const selectResetPasswordSent = (state: AppState) =>
  getIn(state, ['user', 'resetPassword', 'sent']);

export const selectResetPasswordError = (state: AppState) =>
  getIn(state, ['user', 'resetPassword', 'error']);

export const selectChangePasswordSending = (state: AppState) =>
  getIn(state, ['user', 'changePassword', 'isSending']);

export const selectChangePasswordSent = (state: AppState) =>
  getIn(state, ['user', 'changePassword', 'sent']);

export const selectChangePasswordError = (state: AppState) =>
  getIn(state, ['user', 'changePassword', 'error']);
