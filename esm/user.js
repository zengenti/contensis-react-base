import { l as loginUser, a as logoutUser, r as registerUser } from './ChangePassword.container-6fQXhkzW.js';
export { C as ChangePassword, F as ForgotPasswordContainer, c as LoginContainer, L as LoginHelper, R as RegistrationContainer, b as actions, h as handleRequiresLoginSaga, g as refreshSecurityToken, f as useChangePassword, e as useForgotPassword, u as useLogin, d as useRegistration } from './ChangePassword.container-6fQXhkzW.js';
import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { t as toJS, s as selectUserErrorMessage, a as selectUserIsAuthenticated, b as selectUserIsAuthenticationError, c as selectUserIsError, d as selectUserIsLoading, e as selectUser, f as selectUserRegistrationError, g as selectUserRegistrationIsLoading, h as selectUserRegistrationIsSuccess, i as selectUserRegistration } from './ToJs-B4MH53fx.js';
export { j as selectors } from './ToJs-B4MH53fx.js';
import { C as CookieHelper } from './CookieHelper.class-DqJ_o1jL.js';
export { i as initialUserState, U as reducer, t as types } from './selectors-BRzliwbK.js';
import '@redux-saga/core/effects';
import 'jsonpath-mapper';
import 'await-to-js';
import 'immer';
import 'query-string';

const getDisplayName$1 = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
const withLogin = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      errorMessage: selectUserErrorMessage(state),
      isAuthenticated: selectUserIsAuthenticated(state),
      isAuthenticationError: selectUserIsAuthenticationError(state),
      isError: selectUserIsError(state),
      isLoading: selectUserIsLoading(state),
      user: selectUser(state),
      // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
      authenticationError: selectUserIsAuthenticationError(state),
      // DEPRECATED: error is deprecated use isError instead
      error: selectUserIsError(state)
    };
  };
  const ConnectedComponent = () => {
    const cookies = new CookieHelper(...useCookies());
    const mapDispatchToProps = {
      loginUser: (username, password) => loginUser(username, password, cookies),
      logoutUser: redirectPath => logoutUser(redirectPath, cookies)
    };
    const FinalComponent = connect(mapStateToProps, mapDispatchToProps)(toJS(WrappedComponent));
    return /*#__PURE__*/React.createElement(FinalComponent, null);
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
      error: selectUserRegistrationError(state),
      isLoading: selectUserRegistrationIsLoading(state),
      isSuccess: selectUserRegistrationIsSuccess(state),
      user: selectUserRegistration(state)
    };
  };
  const mapDispatchToProps = {
    registerUser
  };
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

export { withLogin, withRegistration };
//# sourceMappingURL=user.js.map
