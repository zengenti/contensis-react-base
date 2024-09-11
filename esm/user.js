import { a as loginUser, b as logoutUser, r as registerUser } from './ChangePassword.container-572653e2.js';
export { C as ChangePassword, F as ForgotPasswordContainer, d as LoginContainer, L as LoginHelper, R as RegistrationContainer, c as actions, h as handleRequiresLoginSaga, k as refreshSecurityToken, j as useChangePassword, i as useForgotPassword, u as useLogin, e as useRegistration } from './ChangePassword.container-572653e2.js';
import React from 'react';
import { useCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { t as toJS, c as selectUserErrorMessage, a as selectUserIsAuthenticated, d as selectUserIsAuthenticationError, e as selectUserIsError, f as selectUserIsLoading, g as selectUser, h as selectUserRegistrationError, i as selectUserRegistrationIsLoading, j as selectUserRegistrationIsSuccess, k as selectUserRegistration } from './ToJs-0ed7c7db.js';
export { y as selectors } from './ToJs-0ed7c7db.js';
import { a as CookieHelper } from './CookieHelper.class-67f65459.js';
export { a4 as initialUserState, V as reducer, a3 as types } from './selectors-bb117d1b.js';
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
