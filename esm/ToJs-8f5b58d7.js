import React from 'react';
import { Iterable } from 'immutable';

const selectUserIsLoading = state => {
  var _state$user, _state$user$authentic;

  return state === null || state === void 0 ? void 0 : (_state$user = state.user) === null || _state$user === void 0 ? void 0 : (_state$user$authentic = _state$user.authenticationState) === null || _state$user$authentic === void 0 ? void 0 : _state$user$authentic.loading;
};
const selectUserIsAuthenticated = state => {
  var _state$user2, _state$user2$authenti;

  return state === null || state === void 0 ? void 0 : (_state$user2 = state.user) === null || _state$user2 === void 0 ? void 0 : (_state$user2$authenti = _state$user2.authenticationState) === null || _state$user2$authenti === void 0 ? void 0 : _state$user2$authenti.authenticated;
};
const selectUserAuthenticationError = state => {
  var _state$user3, _state$user3$authenti;

  return state === null || state === void 0 ? void 0 : (_state$user3 = state.user) === null || _state$user3 === void 0 ? void 0 : (_state$user3$authenti = _state$user3.authenticationState) === null || _state$user3$authenti === void 0 ? void 0 : _state$user3$authenti.authenticationError;
};
const selectUserError = state => {
  var _state$user4, _state$user4$authenti;

  return state === null || state === void 0 ? void 0 : (_state$user4 = state.user) === null || _state$user4 === void 0 ? void 0 : (_state$user4$authenti = _state$user4.authenticationState) === null || _state$user4$authenti === void 0 ? void 0 : _state$user4$authenti.error;
};
const selectClientCredentials = state => {
  var _state$user5, _state$user5$authenti;

  return state === null || state === void 0 ? void 0 : (_state$user5 = state.user) === null || _state$user5 === void 0 ? void 0 : (_state$user5$authenti = _state$user5.authenticationState) === null || _state$user5$authenti === void 0 ? void 0 : _state$user5$authenti.clientCredentials;
};
const selectUser = state => state === null || state === void 0 ? void 0 : state.user;
const selectUserIsZengentiStaff = state => {
  var _state$user6;

  return state === null || state === void 0 ? void 0 : (_state$user6 = state.user) === null || _state$user6 === void 0 ? void 0 : _state$user6.isZengentiStaff;
};
const selectUserGuid = state => {
  var _state$user7;

  return state === null || state === void 0 ? void 0 : (_state$user7 = state.user) === null || _state$user7 === void 0 ? void 0 : _state$user7.id;
};
const selectUsername = state => {
  var _state$user8;

  return state === null || state === void 0 ? void 0 : (_state$user8 = state.user) === null || _state$user8 === void 0 ? void 0 : _state$user8.username;
};
const selectUserEmail = state => {
  var _state$user9;

  return state === null || state === void 0 ? void 0 : (_state$user9 = state.user) === null || _state$user9 === void 0 ? void 0 : _state$user9.email;
};
const selectUserGroups = state => {
  var _state$user10;

  return state === null || state === void 0 ? void 0 : (_state$user10 = state.user) === null || _state$user10 === void 0 ? void 0 : _state$user10.groups;
};
const selectUserSecurityToken = state => {
  var _state$user11, _state$user11$authent, _state$user11$authent2;

  return state === null || state === void 0 ? void 0 : (_state$user11 = state.user) === null || _state$user11 === void 0 ? void 0 : (_state$user11$authent = _state$user11.authenticationState) === null || _state$user11$authent === void 0 ? void 0 : (_state$user11$authent2 = _state$user11$authent.clientCredentials) === null || _state$user11$authent2 === void 0 ? void 0 : _state$user11$authent2.contensisClassicToken;
};
const selectUserRegistration = state => {
  var _state$user12;

  return (state === null || state === void 0 ? void 0 : (_state$user12 = state.user) === null || _state$user12 === void 0 ? void 0 : _state$user12.registration) || {};
};
const selectUserRegistrationError = state => {
  var _state$user13, _state$user13$registr;

  return (state === null || state === void 0 ? void 0 : (_state$user13 = state.user) === null || _state$user13 === void 0 ? void 0 : (_state$user13$registr = _state$user13.registration) === null || _state$user13$registr === void 0 ? void 0 : _state$user13$registr.error) || false;
};
const selectUserRegistrationIsLoading = state => {
  var _state$user14, _state$user14$registr;

  return (state === null || state === void 0 ? void 0 : (_state$user14 = state.user) === null || _state$user14 === void 0 ? void 0 : (_state$user14$registr = _state$user14.registration) === null || _state$user14$registr === void 0 ? void 0 : _state$user14$registr.loading) || false;
};
const selectUserRegistrationIsSuccess = state => {
  var _state$user15, _state$user15$registr;

  return (state === null || state === void 0 ? void 0 : (_state$user15 = state.user) === null || _state$user15 === void 0 ? void 0 : (_state$user15$registr = _state$user15.registration) === null || _state$user15$registr === void 0 ? void 0 : _state$user15$registr.success) || false;
};

var selectors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  selectUserIsLoading: selectUserIsLoading,
  selectUserIsAuthenticated: selectUserIsAuthenticated,
  selectUserAuthenticationError: selectUserAuthenticationError,
  selectUserError: selectUserError,
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
  selectUserRegistrationIsSuccess: selectUserRegistrationIsSuccess
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

const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
};

export { selectUserGroups as a, selectClientCredentials as b, selectUserAuthenticationError as c, selectUserError as d, selectUserIsLoading as e, selectUser as f, selectUserRegistrationError as g, selectUserRegistrationIsLoading as h, selectUserRegistrationIsSuccess as i, selectUserRegistration as j, selectors as k, matchUserGroup as m, selectUserIsAuthenticated as s, toJS as t };
//# sourceMappingURL=ToJs-8f5b58d7.js.map
