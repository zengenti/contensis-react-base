'use strict';

var React = require('react');
var immutable = require('immutable');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const selectUserIsLoading = state => {
  return state.getIn(['user', 'authenticationState', 'loading']);
};
const selectUserIsAuthenticated = state => {
  return state.getIn(['user', 'authenticationState', 'authenticated']) && state.getIn(['user']) != null;
};
const selectUserAuthenticationError = state => {
  return state.getIn(['user', 'authenticationState', 'authenticationError']);
};
const selectUserError = state => {
  return state.getIn(['user', 'authenticationState', 'error']);
};
const selectClientCredentials = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials']);
};
const selectUser = state => {
  return state.getIn(['user']);
};
const selectUserIsZengentiStaff = state => {
  return state.getIn(['user', 'isZengentiStaff']);
};
const selectUserGuid = state => {
  return state.getIn(['user', 'id']);
};
const selectUsername = state => {
  return state.getIn(['user', 'userName']);
};
const selectUserEmail = state => {
  return state.getIn(['user', 'email']);
};
const selectUserGroups = state => {
  return state.getIn(['user', 'groups']);
};
const selectUserSecurityToken = state => {
  return state.getIn(['user', 'authenticationState', 'clientCredentials', 'contensisClassicToken']);
};
const selectUserMobile = state => {
  return state.getIn(['user', 'custom', 'mobile']);
};
const selectUserLandline = state => {
  return state.getIn(['user', 'custom', 'telephone']);
};
const selectUserCanCallMobileInEmergency = state => {
  return state.getIn(['user', 'custom', 'canCallMobileInEmergency']);
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
  selectUserMobile: selectUserMobile,
  selectUserLandline: selectUserLandline,
  selectUserCanCallMobileInEmergency: selectUserCanCallMobileInEmergency
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
    newProps[wrappedComponentProp[KEY]] = immutable.Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return React__default['default'].createElement(WrappedComponent, propsJS);
};

exports.matchUserGroup = matchUserGroup;
exports.selectClientCredentials = selectClientCredentials;
exports.selectUser = selectUser;
exports.selectUserAuthenticationError = selectUserAuthenticationError;
exports.selectUserError = selectUserError;
exports.selectUserGroups = selectUserGroups;
exports.selectUserIsAuthenticated = selectUserIsAuthenticated;
exports.selectUserIsLoading = selectUserIsLoading;
exports.selectors = selectors;
exports.toJS = toJS;
//# sourceMappingURL=ToJs-8dd77129.js.map
