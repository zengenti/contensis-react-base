export const selectUserIsLoading = state => {
  return state.getIn(['user', 'authenticationState', 'loading']);
};
export const selectUserIsAuthenticated = state => {
  return (
    state.getIn(['user', 'authenticationState', 'authenticated']) &&
    state.getIn(['user']) != null
  );
};
export const selectUserAuthenticationError = state => {
  return state.getIn(['user', 'authenticationState', 'authenticationError']);
};
export const selectUserError = state => {
  return state.getIn(['user', 'authenticationState', 'error']);
};
export const selectClientCredentials = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials']);
};
export const selectUser = state => {
  return state.getIn(['user']);
};
export const selectUserIsZengentiStaff = state => {
  return state.getIn(['user', 'isZengentiStaff']);
};
export const selectUserGuid = state => {
  return state.getIn(['user', 'id']);
};
export const selectUsername = state => {
  return state.getIn(['user', 'userName']);
};
export const selectUserEmail = state => {
  return state.getIn(['user', 'email']);
};
export const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
export const selectUserSecurityToken = state => {
  return state.getIn([
    'user',
    'authenticationState',
    'clientCredentials',
    'contensisClassicToken',
  ]);
};
export const selectUserMobile = state => {
  return state.getIn(['user', 'custom', 'mobile']);
};
export const selectUserLandline = state => {
  return state.getIn(['user', 'custom', 'telephone']);
};
export const selectUserCanCallMobileInEmergency = state => {
  return state.getIn(['user', 'custom', 'canCallMobileInEmergency']);
};
