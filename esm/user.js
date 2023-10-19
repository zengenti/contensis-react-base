export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-950e0b92.js';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector, connect } from 'react-redux';
import { D as action, o as selectCurrentSearch } from './selectors-1a3c1725.js';
import { L as LOGIN_USER, n as LOGOUT_USER, R as REGISTER_USER, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD, C as CHANGE_USER_PASSWORD } from './reducers-3d5c37d1.js';
export { o as initialUserState, U as reducer, t as types } from './reducers-3d5c37d1.js';
import { c as selectUserErrorMessage, a as selectUserIsAuthenticated, d as selectUserIsAuthenticationError, e as selectUserIsError, f as selectUserIsLoading, g as selectUser, t as toJS, h as selectUserRegistrationError, i as selectUserRegistrationIsLoading, j as selectUserRegistrationIsSuccess, k as selectUserRegistration, l as selectPasswordResetRequestSending, n as selectPasswordResetRequestSent, o as selectPasswordResetRequestError, p as selectResetPasswordSending, q as selectResetPasswordSent, r as selectResetPasswordError, u as selectChangePasswordSending, v as selectChangePasswordSent, w as selectUserGuid, x as selectChangePasswordError } from './ToJs-e1af7030.js';
export { y as selectors } from './ToJs-e1af7030.js';
import { C as CookieHelper } from './CookieHelper.class-4d6ee27b.js';
import React from 'react';
import '@redux-saga/core/effects';
import 'jsonpath-mapper';
import 'await-to-js';
import './CookieConstants-3d3b6531.js';
import 'query-string';
import 'immer';

const loginUser = (username, password, cookies) => action(LOGIN_USER, {
  username,
  password,
  cookies
});
const logoutUser = (redirectPath, cookies) => action(LOGOUT_USER, {
  redirectPath,
  cookies
});
const registerUser = (user, mappers) => action(REGISTER_USER, {
  user,
  mappers
});
const requestPasswordReset = userEmailObject => action(REQUEST_USER_PASSWORD_RESET, {
  userEmailObject
});
const resetPassword = resetPasswordObject => action(RESET_USER_PASSWORD, {
  resetPasswordObject
});
const changePassword = (userId, currentPassword, newPassword) => action(CHANGE_USER_PASSWORD, {
  userId,
  currentPassword,
  newPassword
});

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loginUser: loginUser,
  logoutUser: logoutUser,
  registerUser: registerUser,
  requestPasswordReset: requestPasswordReset,
  resetPassword: resetPassword,
  changePassword: changePassword
});

const useLogin = () => {
  const cookies = new CookieHelper(...useCookies());
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password, cookies)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath, cookies)),
    errorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    isAuthenticationError: select(selectUserIsAuthenticationError),
    isError: select(selectUserIsError),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser),
    // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
    authenticationError: select(selectUserIsAuthenticationError),
    // DEPRECATED: authenticationErrorMessage is deprecated use errorMessage instead
    authenticationErrorMessage: select(selectUserErrorMessage),
    // DEPRECATED: error is deprecated use isError instead
    error: select(selectUserIsError)
  };
};

const LoginContainer = ({
  children,
  ...props
}) => {
  const userProps = useLogin();
  return children(userProps);
};
LoginContainer.propTypes = {};
var Login_container = toJS(LoginContainer);

const useRegistration = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    error: select(selectUserRegistrationError),
    isLoading: select(selectUserRegistrationIsLoading),
    isSuccess: select(selectUserRegistrationIsSuccess),
    user: select(selectUserRegistration)
  };
};

const RegistrationContainer = ({
  children,
  ...props
}) => {
  const userProps = useRegistration();
  return children(userProps);
};
RegistrationContainer.propTypes = {};
var Registration_container = toJS(RegistrationContainer);

const useForgotPassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    isLoading: select(selectPasswordResetRequestSending),
    isSuccess: select(selectPasswordResetRequestSent),
    error: select(selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject)),
    setNewPassword: {
      queryString: select(selectCurrentSearch),
      isLoading: select(selectResetPasswordSending),
      isSuccess: select(selectResetPasswordSent),
      error: select(selectResetPasswordError),
      submit: resetPasswordObject => dispatch(resetPassword(resetPasswordObject))
    }
  };
};

const ForgotPasswordContainer = ({
  children,
  ...props
}) => {
  const userProps = useForgotPassword();
  return children(userProps);
};
ForgotPasswordContainer.propTypes = {};
var ForgotPassword_container = toJS(ForgotPasswordContainer);

const useChangePassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    isLoading: select(selectChangePasswordSending),
    isSuccess: select(selectChangePasswordSent),
    userId: select(selectUserGuid),
    isLoggedIn: select(selectUserIsAuthenticated),
    error: select(selectChangePasswordError),
    changePassword: (userId, currentPassword, newPassword) => dispatch(changePassword(userId, currentPassword, newPassword))
  };
};

const ChangePasswordContainer = ({
  children,
  ...props
}) => {
  const userProps = useChangePassword();
  return children(userProps);
};
ChangePasswordContainer.propTypes = {};
var ChangePassword_container = toJS(ChangePasswordContainer);

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

export { ChangePassword_container as ChangePassword, ForgotPassword_container as ForgotPasswordContainer, Login_container as LoginContainer, Registration_container as RegistrationContainer, actions, useChangePassword, useForgotPassword, useLogin, useRegistration, withLogin, withRegistration };
//# sourceMappingURL=user.js.map
