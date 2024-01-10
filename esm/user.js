import { a as loginUser, b as logoutUser, r as registerUser } from './ChangePassword.container-6cb4994d.js';
export { C as ChangePassword, F as ForgotPasswordContainer, d as LoginContainer, L as LoginHelper, R as RegistrationContainer, c as actions, h as handleRequiresLoginSaga, k as refreshSecurityToken, j as useChangePassword, i as useForgotPassword, u as useLogin, e as useRegistration } from './ChangePassword.container-6cb4994d.js';
import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { C as CookieHelper, t as toJS, c as selectUserErrorMessage, a as selectUserIsAuthenticated, d as selectUserIsAuthenticationError, e as selectUserIsError, f as selectUserIsLoading, g as selectUser, h as selectUserRegistrationError, i as selectUserRegistrationIsLoading, j as selectUserRegistrationIsSuccess, k as selectUserRegistration } from './ToJs-e50a9380.js';
export { y as selectors } from './ToJs-e50a9380.js';
export { o as initialUserState, U as reducer, t as types } from './reducers-3d5c37d1.js';
import '@redux-saga/core/effects';
import './selectors-5ed5ae70.js';
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
