export const selectUserIsLoading = (state: any) =>
  state?.user?.authenticationState?.loading;

export const selectUserIsAuthenticated = (state: any) =>
  state?.user?.authenticationState?.authenticated;

export const selectUserAuthenticationError = (state: any) =>
  state?.user?.authenticationState?.authenticationError;

export const selectUserError = (state: any) =>
  state?.user?.authenticationState?.error;

export const selectClientCredentials = (state: any) =>
  state?.user?.authenticationState?.clientCredentials;

export const selectUser = (state: any) => state?.user;

export const selectUserIsZengentiStaff = (state: any) =>
  state?.user?.isZengentiStaff;

export const selectUserGuid = (state: any) => state?.user?.id;

export const selectUsername = (state: any) => state?.user?.username;

export const selectUserEmail = (state: any) => state?.user?.email;

export const selectUserGroups = (state: any) => state?.user?.groups;

export const selectUserSecurityToken = (state: any) =>
  state?.user?.authenticationState?.clientCredentials?.contensisClassicToken;

export const selectUserRegistration = (state: any) =>
  state?.user?.registration || {};

export const selectUserRegistrationError = (state: any) =>
  state?.user?.registration?.error || false;

export const selectUserRegistrationIsLoading = (state: any) =>
  state?.user?.registration?.loading || false;

export const selectUserRegistrationIsSuccess = (state: any) =>
  state?.user?.registration?.success || false;
