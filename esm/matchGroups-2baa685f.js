import { o as getJS } from './selectors-c33466a6.js';

const select = state => getJS(state, 'user');

const selectUserIsLoading = state => {
  var _select, _select$authenticatio;

  return (_select = select(state)) === null || _select === void 0 ? void 0 : (_select$authenticatio = _select.authenticationState) === null || _select$authenticatio === void 0 ? void 0 : _select$authenticatio.loading;
};
const selectUserIsAuthenticated = state => {
  var _select2, _select2$authenticati;

  return (_select2 = select(state)) === null || _select2 === void 0 ? void 0 : (_select2$authenticati = _select2.authenticationState) === null || _select2$authenticati === void 0 ? void 0 : _select2$authenticati.authenticated;
};
const selectUserAuthenticationError = state => {
  var _select3, _select3$authenticati;

  return (_select3 = select(state)) === null || _select3 === void 0 ? void 0 : (_select3$authenticati = _select3.authenticationState) === null || _select3$authenticati === void 0 ? void 0 : _select3$authenticati.authenticationError;
};
const selectUserAuthenticationErrorMessage = state => {
  var _select4, _select4$authenticati;

  return (_select4 = select(state)) === null || _select4 === void 0 ? void 0 : (_select4$authenticati = _select4.authenticationState) === null || _select4$authenticati === void 0 ? void 0 : _select4$authenticati.authenticationErrorMessage;
};
const selectUserError = state => {
  var _select5, _select5$authenticati;

  return (_select5 = select(state)) === null || _select5 === void 0 ? void 0 : (_select5$authenticati = _select5.authenticationState) === null || _select5$authenticati === void 0 ? void 0 : _select5$authenticati.error;
};
const selectUserErrorMessage = state => {
  var _select6, _select6$authenticati;

  return (_select6 = select(state)) === null || _select6 === void 0 ? void 0 : (_select6$authenticati = _select6.authenticationState) === null || _select6$authenticati === void 0 ? void 0 : _select6$authenticati.errorMessage;
};
const selectClientCredentials = state => {
  var _select7, _select7$authenticati;

  return (_select7 = select(state)) === null || _select7 === void 0 ? void 0 : (_select7$authenticati = _select7.authenticationState) === null || _select7$authenticati === void 0 ? void 0 : _select7$authenticati.clientCredentials;
};
const selectUser = state => state === null || state === void 0 ? void 0 : state.user;
const selectUserIsZengentiStaff = state => {
  var _select8;

  return (_select8 = select(state)) === null || _select8 === void 0 ? void 0 : _select8.isZengentiStaff;
};
const selectUserGuid = state => {
  var _select9;

  return (_select9 = select(state)) === null || _select9 === void 0 ? void 0 : _select9.id;
};
const selectUsername = state => {
  var _select10;

  return (_select10 = select(state)) === null || _select10 === void 0 ? void 0 : _select10.username;
};
const selectUserEmail = state => {
  var _select11;

  return (_select11 = select(state)) === null || _select11 === void 0 ? void 0 : _select11.email;
};
const selectUserGroups = state => {
  var _select12;

  return (_select12 = select(state)) === null || _select12 === void 0 ? void 0 : _select12.groups;
};
const selectUserSecurityToken = state => {
  var _select13, _select13$authenticat, _select13$authenticat2;

  return (_select13 = select(state)) === null || _select13 === void 0 ? void 0 : (_select13$authenticat = _select13.authenticationState) === null || _select13$authenticat === void 0 ? void 0 : (_select13$authenticat2 = _select13$authenticat.clientCredentials) === null || _select13$authenticat2 === void 0 ? void 0 : _select13$authenticat2.contensisClassicToken;
};
const selectUserRegistration = state => {
  var _select14;

  return ((_select14 = select(state)) === null || _select14 === void 0 ? void 0 : _select14.registration) || {};
};
const selectUserRegistrationError = state => {
  var _select15, _select15$registratio;

  return ((_select15 = select(state)) === null || _select15 === void 0 ? void 0 : (_select15$registratio = _select15.registration) === null || _select15$registratio === void 0 ? void 0 : _select15$registratio.error) || false;
};
const selectUserRegistrationIsLoading = state => {
  var _select16, _select16$registratio;

  return ((_select16 = select(state)) === null || _select16 === void 0 ? void 0 : (_select16$registratio = _select16.registration) === null || _select16$registratio === void 0 ? void 0 : _select16$registratio.loading) || false;
};
const selectUserRegistrationIsSuccess = state => {
  var _select17, _select17$registratio;

  return ((_select17 = select(state)) === null || _select17 === void 0 ? void 0 : (_select17$registratio = _select17.registration) === null || _select17$registratio === void 0 ? void 0 : _select17$registratio.success) || false;
};
const selectPasswordResetRequestSending = state => {
  var _select18, _select18$passwordRes;

  return (_select18 = select(state)) === null || _select18 === void 0 ? void 0 : (_select18$passwordRes = _select18.passwordResetRequest) === null || _select18$passwordRes === void 0 ? void 0 : _select18$passwordRes.isSending;
};
const selectPasswordResetRequestSent = state => {
  var _select19, _select19$passwordRes;

  return (_select19 = select(state)) === null || _select19 === void 0 ? void 0 : (_select19$passwordRes = _select19.passwordResetRequest) === null || _select19$passwordRes === void 0 ? void 0 : _select19$passwordRes.sent;
};
const selectPasswordResetRequestError = state => {
  var _select20, _select20$passwordRes;

  return (_select20 = select(state)) === null || _select20 === void 0 ? void 0 : (_select20$passwordRes = _select20.passwordResetRequest) === null || _select20$passwordRes === void 0 ? void 0 : _select20$passwordRes.error;
};
const selectResetPasswordSending = state => {
  var _select21, _select21$resetPasswo;

  return (_select21 = select(state)) === null || _select21 === void 0 ? void 0 : (_select21$resetPasswo = _select21.resetPassword) === null || _select21$resetPasswo === void 0 ? void 0 : _select21$resetPasswo.isSending;
};
const selectResetPasswordSent = state => {
  var _select22, _select22$resetPasswo;

  return (_select22 = select(state)) === null || _select22 === void 0 ? void 0 : (_select22$resetPasswo = _select22.resetPassword) === null || _select22$resetPasswo === void 0 ? void 0 : _select22$resetPasswo.sent;
};
const selectResetPasswordError = state => {
  var _select23, _select23$resetPasswo;

  return (_select23 = select(state)) === null || _select23 === void 0 ? void 0 : (_select23$resetPasswo = _select23.resetPassword) === null || _select23$resetPasswo === void 0 ? void 0 : _select23$resetPasswo.error;
};
const selectChangePasswordSending = state => {
  var _select24, _select24$changePassw;

  return (_select24 = select(state)) === null || _select24 === void 0 ? void 0 : (_select24$changePassw = _select24.changePassword) === null || _select24$changePassw === void 0 ? void 0 : _select24$changePassw.isSending;
};
const selectChangePasswordSent = state => {
  var _select25, _select25$changePassw;

  return (_select25 = select(state)) === null || _select25 === void 0 ? void 0 : (_select25$changePassw = _select25.changePassword) === null || _select25$changePassw === void 0 ? void 0 : _select25$changePassw.sent;
};
const selectChangePasswordError = state => {
  var _select26, _select26$changePassw;

  return (_select26 = select(state)) === null || _select26 === void 0 ? void 0 : (_select26$changePassw = _select26.changePassword) === null || _select26$changePassw === void 0 ? void 0 : _select26$changePassw.error;
};

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

export { selectUserIsAuthenticated as a, selectUserGroups as b, selectUserAuthenticationError as c, selectUserAuthenticationErrorMessage as d, selectUserError as e, selectUserErrorMessage as f, selectUserIsLoading as g, selectUser as h, selectUserRegistrationError as i, selectUserRegistrationIsLoading as j, selectUserRegistrationIsSuccess as k, selectUserRegistration as l, matchUserGroup as m, selectPasswordResetRequestSending as n, selectPasswordResetRequestSent as o, selectPasswordResetRequestError as p, selectResetPasswordSending as q, selectResetPasswordSent as r, selectClientCredentials as s, selectResetPasswordError as t, selectChangePasswordSending as u, selectChangePasswordSent as v, selectChangePasswordError as w, selectors as x };
//# sourceMappingURL=matchGroups-2baa685f.js.map
