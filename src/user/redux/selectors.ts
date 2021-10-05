import { AppState } from '~/redux/appstate';
import { getImmutableOrJS as getIn } from '~/redux/util';

export const selectUserIsLoading = (state: AppState) =>
  getIn(state, ['authenticationState', 'loading']);

export const selectUserIsAuthenticated = (state: AppState) =>
  getIn(state, ['authenticationState', 'authenticated']);

export const selectUserAuthenticationError = (state: AppState) =>
  getIn(state, ['authenticationState', 'authenticationError']);

export const selectUserAuthenticationErrorMessage = (state: AppState) =>
  getIn(state, ['authenticationState', 'authenticationErrorMessage']);

export const selectUserError = (state: AppState) =>
  getIn(state, ['authenticationState', 'error']);

export const selectUserErrorMessage = (state: AppState) =>
  getIn(state, ['authenticationState', 'errorMessage']);

export const selectClientCredentials = (state: AppState) =>
  getIn(state, ['authenticationState', 'clientCredentials']);

export const selectUser = (state: AppState) => getIn(state, 'user');

export const selectUserIsZengentiStaff = (state: AppState) =>
  getIn(state, ['isZengentiStaff']);

export const selectUserGuid = (state: AppState) => getIn(state, ['id']);

export const selectUsername = (state: AppState) => getIn(state, ['username']);

export const selectUserEmail = (state: AppState) => getIn(state, ['email']);

export const selectUserGroups = (state: AppState) => getIn(state, ['groups']);

export const selectUserSecurityToken = (state: AppState) =>
  getIn(state, [
    'authenticationState',
    'clientCredentials',
    'contensisClassicToken',
  ]);

export const selectUserRegistration = (state: AppState) =>
  getIn(state, ['registration'], {});

export const selectUserRegistrationError = (state: AppState) =>
  getIn(state, ['registration', 'error'], false);

export const selectUserRegistrationIsLoading = (state: AppState) =>
  getIn(state, ['registration', 'loading'], false);

export const selectUserRegistrationIsSuccess = (state: AppState) =>
  getIn(state, ['registration', 'success'], false);

export const selectPasswordResetRequestSending = (state: AppState) =>
  getIn(state, ['passwordResetRequest', 'isSending']);

export const selectPasswordResetRequestSent = (state: AppState) =>
  getIn(state, ['passwordResetRequest', 'sent']);

export const selectPasswordResetRequestError = (state: AppState) =>
  getIn(state, ['passwordResetRequest', 'error']);

export const selectResetPasswordSending = (state: AppState) =>
  getIn(state, ['resetPassword', 'isSending']);

export const selectResetPasswordSent = (state: AppState) =>
  getIn(state, ['resetPassword', 'sent']);

export const selectResetPasswordError = (state: AppState) =>
  getIn(state, ['resetPassword', 'error']);

export const selectChangePasswordSending = (state: AppState) =>
  getIn(state, ['changePassword', 'isSending']);

export const selectChangePasswordSent = (state: AppState) =>
  getIn(state, ['changePassword', 'sent']);

export const selectChangePasswordError = (state: AppState) =>
  getIn(state, ['changePassword', 'error']);
