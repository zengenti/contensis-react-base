import { e as logoutUser, d as loginUser, i as registerUser } from './ChangePassword.container-DtqL0Qfl.js';
export { C as ChangePassword, F as ForgotPasswordContainer, a as LoginContainer, L as LoginHelper, R as RegistrationContainer, b as actions, h as handleRequiresLoginSaga, r as refreshSecurityToken, u as useChangePassword, j as useForgotPassword, k as useLogin, m as useRegistration } from './ChangePassword.container-DtqL0Qfl.js';
import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { q as selectUserIsError, p as selectUserIsAuthenticationError, j as selectUser, r as selectUserIsLoading, o as selectUserIsAuthenticated, k as selectUserErrorMessage, t as selectUserRegistration, w as selectUserRegistrationIsSuccess, v as selectUserRegistrationIsLoading, u as selectUserRegistrationError } from './matchGroups-DOA5huT8.js';
export { x as selectors } from './matchGroups-DOA5huT8.js';
import { C as CookieHelper } from './CookieHelper.class-C6rTRl_1.js';
import { t as toJS } from './ToJs-BnRRHk6f.js';
export { z as initialUserState, v as reducer, a7 as types } from './selectors-CWU-QA6Y.js';
import '@redux-saga/core/effects';
import 'jsonpath-mapper';
import 'await-to-js';
import './CookieConstants-DEmbwzYr.js';
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
