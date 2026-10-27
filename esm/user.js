import { s as logoutUser, r as loginUser, v as registerUser } from './ChangePassword.container-BSlA39xi.js';
export { C as ChangePassword, F as ForgotPasswordContainer, a as LoginContainer, L as LoginHelper, R as RegistrationContainer, b as actions, j as handleRequiresLoginSaga, t as refreshSecurityToken, y as useChangePassword, z as useForgotPassword, A as useLogin, B as useRegistration } from './ChangePassword.container-BSlA39xi.js';
import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { q as selectUserIsError, p as selectUserIsAuthenticationError, j as selectUser, r as selectUserIsLoading, o as selectUserIsAuthenticated, k as selectUserErrorMessage, t as selectUserRegistration, w as selectUserRegistrationIsSuccess, v as selectUserRegistrationIsLoading, u as selectUserRegistrationError } from './selectors-BlkOXbMw.js';
export { y as selectors } from './selectors-BlkOXbMw.js';
import { C as CookieHelper } from './CookieHelper.class-C6rTRl_1.js';
import { D as activeLoginMethod } from './selectors-B0OTKlis.js';
export { G as initialUserState, H as isIdpEnabled, I as isWsFedLoginEnabled, A as reducer, af as types } from './selectors-B0OTKlis.js';
import { t as toJS } from './ToJs-BnRRHk6f.js';
import '@redux-saga/core/effects';
import 'jsonpath-mapper';
import './CookieConstants-YLzXsjzH.js';
import 'loglevel';
import 'await-to-js';
import 'enterprise-fetch';
import 'immer';
import 'reselect';
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
      // Config, not state: static for the life of the process.
      loginMethod: activeLoginMethod(),
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

export { activeLoginMethod, withLogin, withRegistration };
//# sourceMappingURL=user.js.map
