import { a as loginUser, b as logoutUser, r as registerUser } from './ChangePassword.container-6a1c60f3.js';
export { C as ChangePassword, F as ForgotPasswordContainer, d as LoginContainer, L as LoginHelper, R as RegistrationContainer, c as actions, h as handleRequiresLoginSaga, k as refreshSecurityToken, j as useChangePassword, i as useForgotPassword, u as useLogin, e as useRegistration } from './ChangePassword.container-6a1c60f3.js';
import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { c as CookieHelper, t as toJS, d as selectUserErrorMessage, a as selectUserIsAuthenticated, e as selectUserIsAuthenticationError, f as selectUserIsError, g as selectUserIsLoading, h as selectUser, i as selectUserRegistrationError, j as selectUserRegistrationIsLoading, k as selectUserRegistrationIsSuccess, l as selectUserRegistration } from './ToJs-48b1f586.js';
export { z as selectors } from './ToJs-48b1f586.js';
export { o as initialUserState, U as reducer, t as types } from './reducers-919da5e0.js';
import '@redux-saga/core/effects';
import './selectors-1f0cc787.js';
import 'jsonpath-mapper';
import 'query-string';
import 'await-to-js';
import './CookieConstants-3d3b6531.js';
import 'immer';

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
