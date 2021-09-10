import { AppState } from '~/redux/appstate';
import { getJS } from '~/redux/util';

const select = (state: AppState) => getJS(state, 'user');

export const selectUserIsLoading = (state: AppState) =>
  select(state)?.authenticationState?.loading;

export const selectUserIsAuthenticated = (state: AppState) =>
  select(state)?.authenticationState?.authenticated;

export const selectUserAuthenticationError = (state: AppState) =>
  select(state)?.authenticationState?.authenticationError;

export const selectUserAuthenticationErrorMessage = (state: AppState) =>
  select(state)?.authenticationState?.authenticationErrorMessage;

export const selectUserError = (state: AppState) =>
  select(state)?.authenticationState?.error;

export const selectUserErrorMessage = (state: AppState) =>
  select(state)?.authenticationState?.errorMessage;

export const selectClientCredentials = (state: AppState) =>
  select(state)?.authenticationState?.clientCredentials;

export const selectUser = (state: AppState) => state?.user;

export const selectUserIsZengentiStaff = (state: AppState) =>
  select(state)?.isZengentiStaff;

export const selectUserGuid = (state: AppState) => select(state)?.id;

export const selectUsername = (state: AppState) => select(state)?.username;

export const selectUserEmail = (state: AppState) => select(state)?.email;

export const selectUserGroups = (state: AppState) => select(state)?.groups;

export const selectUserSecurityToken = (state: AppState) =>
  select(state)?.authenticationState?.clientCredentials?.contensisClassicToken;

export const selectUserRegistration = (state: AppState) =>
  select(state)?.registration || {};

export const selectUserRegistrationError = (state: AppState) =>
  select(state)?.registration?.error || false;

export const selectUserRegistrationIsLoading = (state: AppState) =>
  select(state)?.registration?.loading || false;

export const selectUserRegistrationIsSuccess = (state: AppState) =>
  select(state)?.registration?.success || false;

export const selectPasswordResetRequestSending = (state: AppState) =>
  select(state)?.passwordResetRequest?.isSending;

export const selectPasswordResetRequestSent = (state: AppState) =>
  select(state)?.passwordResetRequest?.sent;

export const selectPasswordResetRequestError = (state: AppState) =>
  select(state)?.passwordResetRequest?.error;

export const selectResetPasswordSending = (state: AppState) =>
  select(state)?.resetPassword?.isSending;

export const selectResetPasswordSent = (state: AppState) =>
  select(state)?.resetPassword?.sent;

export const selectResetPasswordError = (state: AppState) =>
  select(state)?.resetPassword?.error;

export const selectChangePasswordSending = (state: AppState) =>
  select(state)?.changePassword?.isSending;

export const selectChangePasswordSent = (state: AppState) =>
  select(state)?.changePassword?.sent;

export const selectChangePasswordError = (state: AppState) =>
  select(state)?.changePassword?.error;
