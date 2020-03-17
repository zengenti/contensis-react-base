export const selectUser = state => {
  return state.get('user');
};
export const selectUsername = state => {
  return state.getIn(['user', 'username']);
};
export const selectUserLoggedIn = state => {
  return state.getIn(['user', 'loggedIn']);
};
export const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
export const selectUserMessage = state => {
  return state.getIn(['user', 'logonResultMessage']);
};
export const selectLoginScreenMode = state => {
  return state.getIn(['user', 'loginScreenMode']);
};
export const selectPasswordMessage = state => {
  return state.getIn(['user', 'passwordResetMessage']);
};
export const selectChangePasswordMessage = state => {
  return state.getIn(['user', 'changePasswordMessage']);
};
export const selectCaptchaResponse = state => {
  return state.getIn(['user', 'settings', 'recaptcha', 'response', 'isHuman']);
};
export const selectCaptchaData = state => {
  return state.getIn(['user', 'settings', 'recaptcha', 'response']);
};
export const selectCaptchaToken = state => {
  return state.getIn(['user', 'settings', 'recaptcha', 'response', 'token']);
};
export const selectCaptchaSiteKey = state => {
  return state.getIn(['user', 'recaptchaKey']);
};
