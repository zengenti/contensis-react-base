'use strict';

var selectors = require('./selectors-4e2a4fe0.js');
var sagas = require('./sagas-6d255dcc.js');

const loginUser = (username, password) => selectors.action(sagas.LOGIN_USER, {
  username,
  password
});
const validateUser = cookies => selectors.action(sagas.VALIDATE_USER, {
  cookies
});
const logoutUser = () => selectors.action(sagas.LOGOUT_USER);
const toggleLoginMode = loginMode => selectors.action(sagas.TOGGLE_LOGIN_MODE, {
  loginMode
});
const createUserAccount = () => selectors.action(sagas.CREATE_USER_ACCOUNT);
const forgotPassword = username => selectors.action(sagas.FORGOT_USER_PASSWORD, {
  username
});
const changePassword = (oldPassword, newPassword, newPasswordConfirm) => selectors.action(sagas.CHANGE_USER_PASSWORD, {
  oldPassword,
  newPassword,
  newPasswordConfirm
});
const changePasswordWithToken = (token, newPassword, newPasswordConfirm) => selectors.action(sagas.CHANGE_USER_PASSWORD, {
  token,
  newPassword,
  newPasswordConfirm
});
const setRecaptchaKey = key => selectors.action(sagas.SET_RECAPTCHA_KEY, {
  key
});
const setRecaptchaResponse = (isHuman, token) => selectors.action(sagas.SET_RECAPTCHA_RESPONSE, {
  isHuman,
  token
});

var user = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loginUser: loginUser,
  validateUser: validateUser,
  logoutUser: logoutUser,
  toggleLoginMode: toggleLoginMode,
  createUserAccount: createUserAccount,
  forgotPassword: forgotPassword,
  changePassword: changePassword,
  changePasswordWithToken: changePasswordWithToken,
  setRecaptchaKey: setRecaptchaKey,
  setRecaptchaResponse: setRecaptchaResponse
});

exports.changePassword = changePassword;
exports.changePasswordWithToken = changePasswordWithToken;
exports.forgotPassword = forgotPassword;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.setRecaptchaResponse = setRecaptchaResponse;
exports.toggleLoginMode = toggleLoginMode;
exports.user = user;
//# sourceMappingURL=actions-7064591c.js.map
