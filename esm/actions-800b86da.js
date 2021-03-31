import { t as action } from './selectors-5b478abf.js';
import { L as LOGIN_USER, V as VALIDATE_USER, b as LOGOUT_USER, T as TOGGLE_LOGIN_MODE, C as CREATE_USER_ACCOUNT, F as FORGOT_USER_PASSWORD, c as CHANGE_USER_PASSWORD, S as SET_RECAPTCHA_KEY, d as SET_RECAPTCHA_RESPONSE } from './sagas-bb225af4.js';

const loginUser = (username, password) => action(LOGIN_USER, {
  username,
  password
});
const validateUser = cookies => action(VALIDATE_USER, {
  cookies
});
const logoutUser = () => action(LOGOUT_USER);
const toggleLoginMode = loginMode => action(TOGGLE_LOGIN_MODE, {
  loginMode
});
const createUserAccount = () => action(CREATE_USER_ACCOUNT);
const forgotPassword = username => action(FORGOT_USER_PASSWORD, {
  username
});
const changePassword = (oldPassword, newPassword, newPasswordConfirm) => action(CHANGE_USER_PASSWORD, {
  oldPassword,
  newPassword,
  newPasswordConfirm
});
const changePasswordWithToken = (token, newPassword, newPasswordConfirm) => action(CHANGE_USER_PASSWORD, {
  token,
  newPassword,
  newPasswordConfirm
});
const setRecaptchaKey = key => action(SET_RECAPTCHA_KEY, {
  key
});
const setRecaptchaResponse = (isHuman, token) => action(SET_RECAPTCHA_RESPONSE, {
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

export { logoutUser as a, changePasswordWithToken as b, changePassword as c, forgotPassword as f, loginUser as l, setRecaptchaResponse as s, toggleLoginMode as t, user as u };
//# sourceMappingURL=actions-800b86da.js.map
