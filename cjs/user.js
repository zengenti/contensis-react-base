'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ChangePassword_container = require('./ChangePassword.container-98448cf3.js');
var React = require('react');
var reactCookie = require('react-cookie');
var reactRedux = require('react-redux');
var ToJs = require('./ToJs-7f965106.js');
var CookieHelper_class = require('./CookieHelper.class-34994aa1.js');
var selectors = require('./selectors-e3f1fd85.js');
require('@redux-saga/core/effects');
require('jsonpath-mapper');
require('await-to-js');
require('immer');
require('query-string');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const getDisplayName$1 = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
const withLogin = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      errorMessage: ToJs.selectUserErrorMessage(state),
      isAuthenticated: ToJs.selectUserIsAuthenticated(state),
      isAuthenticationError: ToJs.selectUserIsAuthenticationError(state),
      isError: ToJs.selectUserIsError(state),
      isLoading: ToJs.selectUserIsLoading(state),
      user: ToJs.selectUser(state),
      // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
      authenticationError: ToJs.selectUserIsAuthenticationError(state),
      // DEPRECATED: error is deprecated use isError instead
      error: ToJs.selectUserIsError(state)
    };
  };
  const ConnectedComponent = () => {
    const cookies = new CookieHelper_class.CookieHelper(...reactCookie.useCookies());
    const mapDispatchToProps = {
      loginUser: (username, password) => ChangePassword_container.loginUser(username, password, cookies),
      logoutUser: redirectPath => ChangePassword_container.logoutUser(redirectPath, cookies)
    };
    const FinalComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
    return /*#__PURE__*/React__default["default"].createElement(FinalComponent, null);
  };
  ConnectedComponent.displayName = `${getDisplayName$1(WrappedComponent)}`;
  ConnectedComponent.WrappedComponent = WrappedComponent;
  return ConnectedComponent;
};

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
const withRegistration = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      error: ToJs.selectUserRegistrationError(state),
      isLoading: ToJs.selectUserRegistrationIsLoading(state),
      isSuccess: ToJs.selectUserRegistrationIsSuccess(state),
      user: ToJs.selectUserRegistration(state)
    };
  };
  const mapDispatchToProps = {
    registerUser: ChangePassword_container.registerUser
  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

exports.ChangePassword = ChangePassword_container.ChangePassword_container;
exports.ForgotPasswordContainer = ChangePassword_container.ForgotPassword_container;
exports.LoginContainer = ChangePassword_container.Login_container;
exports.LoginHelper = ChangePassword_container.LoginHelper;
exports.RegistrationContainer = ChangePassword_container.Registration_container;
exports.actions = ChangePassword_container.actions;
exports.handleRequiresLoginSaga = ChangePassword_container.handleRequiresLoginSaga;
exports.refreshSecurityToken = ChangePassword_container.refreshSecurityToken;
exports.useChangePassword = ChangePassword_container.useChangePassword;
exports.useForgotPassword = ChangePassword_container.useForgotPassword;
exports.useLogin = ChangePassword_container.useLogin;
exports.useRegistration = ChangePassword_container.useRegistration;
exports.selectors = ToJs.selectors;
exports.initialUserState = selectors.initialUserState;
exports.reducer = selectors.UserReducer;
exports.types = selectors.types;
exports.withLogin = withLogin;
exports.withRegistration = withRegistration;
//# sourceMappingURL=user.js.map
