export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-d5d4fc3b.js';
import { useDispatch, useSelector, connect } from 'react-redux';
import { r as action, i as selectCurrentSearch } from './selectors-65f0f31c.js';
import { L as LOGIN_USER, n as LOGOUT_USER, R as REGISTER_USER, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD, C as CHANGE_USER_PASSWORD } from './reducers-78488b03.js';
export { o as initialUserState, U as reducer, t as types } from './reducers-78488b03.js';
import { c as selectUserAuthenticationError, d as selectUserErrorMessage, e as selectUserError, a as selectUserIsAuthenticated, f as selectUserIsLoading, g as selectUser, t as toJS, h as selectUserRegistrationError, i as selectUserRegistrationIsLoading, j as selectUserRegistrationIsSuccess, k as selectUserRegistration, l as selectPasswordResetRequestSending, n as selectPasswordResetRequestSent, o as selectPasswordResetRequestError, p as selectResetPasswordSending, q as selectResetPasswordSent, r as selectResetPasswordError, u as selectChangePasswordSending, v as selectChangePasswordSent, w as selectUserGuid, x as selectChangePasswordError } from './ToJs-570d1319.js';
export { y as selectors } from './ToJs-570d1319.js';
import '@redux-saga/core/effects';
import './actions-5437f43d.js';
import 'jsonpath-mapper';
import 'await-to-js';
import 'js-cookie';
import 'query-string';
import 'immer';
import 'react';

const loginUser = (username, password) => action(LOGIN_USER, {
  username,
  password
});
const logoutUser = redirectPath => action(LOGOUT_USER, {
  redirectPath
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
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    authenticationError: select(selectUserAuthenticationError),
    // DEPRECATED: authenticationErrorMessage is deprecated use errorMessage instead
    authenticationErrorMessage: select(selectUserErrorMessage),
    error: select(selectUserError),
    errorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser)
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
      authenticationError: selectUserAuthenticationError(state),
      error: selectUserError(state),
      isAuthenticated: selectUserIsAuthenticated(state),
      isLoading: selectUserIsLoading(state),
      user: selectUser(state)
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser
  };
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName$1(WrappedComponent)}`;
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
