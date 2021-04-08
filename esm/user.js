import 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import 'immutable';
<<<<<<< HEAD
import { k as action } from './routing-3bbf9dde.js';
import { L as LOGIN_USER, c as LOGOUT_USER, R as REGISTER_USER } from './reducers-ed7581c0.js';
export { i as initialUserState, U as reducer, t as types } from './reducers-ed7581c0.js';
=======
import { y as action, n as selectCurrentSearch } from './routing-7eff80b5.js';
<<<<<<< HEAD
<<<<<<< HEAD
import { L as LOGIN_USER, j as LOGOUT_USER, R as REGISTER_USER, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD } from './reducers-29d0efa9.js';
export { m as initialUserState, U as reducer, t as types } from './reducers-29d0efa9.js';
>>>>>>> 10419d5... commit bundles
=======
import { L as LOGIN_USER, j as LOGOUT_USER, R as REGISTER_USER, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD } from './reducers-6d9b6c51.js';
export { m as initialUserState, U as reducer, t as types } from './reducers-6d9b6c51.js';
>>>>>>> bf47c62... chore: Commit bundles
=======
import { L as LOGIN_USER, n as LOGOUT_USER, R as REGISTER_USER, c as REQUEST_USER_PASSWORD_RESET, d as RESET_USER_PASSWORD, C as CHANGE_USER_PASSWORD } from './reducers-7c4796b0.js';
export { p as initialUserState, U as reducer, t as types } from './reducers-7c4796b0.js';
>>>>>>> 8f6a0bd... chore: Commit bundles
import 'query-string';
import './routing-786c3bb0.js';
import '@redux-saga/core/effects';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { c as selectUserAuthenticationError, d as selectUserError, s as selectUserIsAuthenticated, e as selectUserIsLoading, f as selectUser, t as toJS, g as selectUserRegistrationError, h as selectUserRegistrationIsLoading, i as selectUserRegistrationIsSuccess, j as selectUserRegistration } from './ToJs-020d9abb.js';
export { k as selectors } from './ToJs-020d9abb.js';
export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-4324e2fc.js';
=======
import { c as selectUserAuthenticationError, d as selectUserError, s as selectUserIsAuthenticated, e as selectUserIsLoading, f as selectUser, t as toJS, g as selectUserRegistrationError, h as selectUserRegistrationIsLoading, i as selectUserRegistrationIsSuccess, j as selectUserRegistration, k as selectPasswordResetRequestSending, l as selectPasswordResetRequestSent, n as selectPasswordResetRequestError, o as selectResetPasswordSending, p as selectResetPasswordSent, q as selectResetPasswordError } from './ToJs-7da4413c.js';
export { r as selectors } from './ToJs-7da4413c.js';
export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-96837dda.js';
>>>>>>> 10419d5... commit bundles
=======
import { c as selectUserAuthenticationError, d as selectUserAuthenticationErrorMessage, e as selectUserError, f as selectUserErrorMessage, s as selectUserIsAuthenticated, g as selectUserIsLoading, h as selectUser, t as toJS, i as selectUserRegistrationError, j as selectUserRegistrationIsLoading, k as selectUserRegistrationIsSuccess, l as selectUserRegistration, n as selectPasswordResetRequestSending, o as selectPasswordResetRequestSent, p as selectPasswordResetRequestError, q as selectResetPasswordSending, r as selectResetPasswordSent, u as selectResetPasswordError } from './ToJs-dea75c6f.js';
export { v as selectors } from './ToJs-dea75c6f.js';
export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-125acea2.js';
>>>>>>> bf47c62... chore: Commit bundles
=======
import { c as selectUserAuthenticationError, d as selectUserAuthenticationErrorMessage, e as selectUserError, f as selectUserErrorMessage, a as selectUserIsAuthenticated, g as selectUserIsLoading, h as selectUser, t as toJS, i as selectUserRegistrationError, j as selectUserRegistrationIsLoading, k as selectUserRegistrationIsSuccess, l as selectUserRegistration, n as selectPasswordResetRequestSending, o as selectPasswordResetRequestSent, p as selectPasswordResetRequestError, q as selectResetPasswordSending, r as selectResetPasswordSent, u as selectResetPasswordError, v as selectUserGuid, w as selectChangePasswordSending, x as selectChangePasswordSent, y as selectChangePasswordError } from './ToJs-13f1f0b2.js';
export { z as selectors } from './ToJs-13f1f0b2.js';
export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-136056ea.js';
>>>>>>> 8f6a0bd... chore: Commit bundles
import 'jsonpath-mapper';
import 'await-to-js';
import 'js-cookie';

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
    authenticationErrorMessage: select(selectUserAuthenticationErrorMessage),
    error: select(selectUserError),
    errorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser).toJS()
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
    user: select(selectUserRegistration).toJS()
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
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject))
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

const useResetPassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    queryString: select(selectCurrentSearch),
    isLoading: select(selectResetPasswordSending),
    isSuccess: select(selectResetPasswordSent),
    error: select(selectResetPasswordError),
    resetPassword: resetPasswordObject => dispatch(resetPassword(resetPasswordObject))
  };
};

const ResetPasswordContainer = ({
  children,
  ...props
}) => {
  const userProps = useResetPassword();
  return children(userProps);
};

ResetPasswordContainer.propTypes = {};
var ResetPassword_container = toJS(ResetPasswordContainer);

const useUser = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    authenticationError: select(selectUserAuthenticationError),
    authenticationErrorMessage: select(selectUserAuthenticationErrorMessage),
    userError: select(selectUserError),
    userErrorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    userIsLoading: select(selectUserIsLoading),
    user: select(selectUser).toJS(),
    userId: select(selectUserGuid),
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    registrationError: select(selectUserRegistrationError),
    registrationIsLoading: select(selectUserRegistrationIsLoading),
    registrationIsSuccess: select(selectUserRegistrationIsSuccess),
    userRegistration: select(selectUserRegistration).toJS(),
    passwordResetRequestIsLoading: select(selectPasswordResetRequestSending),
    passwordResetRequestIsSuccess: select(selectPasswordResetRequestSent),
    passwordResetRequestError: select(selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject)),
    queryString: select(selectCurrentSearch),
    passwordResetIsLoading: select(selectResetPasswordSending),
    passwordResetIsSuccess: select(selectResetPasswordSent),
    passwordResetError: select(selectResetPasswordError),
    resetPassword: resetPasswordObject => dispatch(resetPassword(resetPasswordObject)),
    changePasswordIsLoading: select(selectChangePasswordSending),
    changePasswordIsSuccess: select(selectChangePasswordSent),
    changePasswordError: select(selectChangePasswordError),
    changePassword: (userId, currentPassword, newPassword) => dispatch(changePassword(userId, currentPassword, newPassword))
  };
};

const UserContainer = ({
  children,
  ...props
}) => {
  const userProps = useUser();
  return children(userProps);
};

UserContainer.propTypes = {};
var User_container = toJS(UserContainer);

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  // Returns a redux-connected component with the following props:
  // this.propTypes = {
  //   loading: PropTypes.bool,
  //   authenticated: PropTypes.bool,
  //   authenticationError: PropTypes.bool,
  //   error: PropTypes.bool,
  //   user: PropTypes.object,
  //   logoutUser: PropTypes.func,
  //   isHeaderLogin: PropTypes.bool,
  // };
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
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

const getDisplayName$1 = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withRegistration = WrappedComponent => {
  // Returns a redux-connected component with the following props:
  // this.propTypes = {
  //   registerUser: PropTypes.func,
  //   isLoading: PropTypes.bool,
  //   isSuccess: PropTypes.bool,
  //   error: PropTypes.bool | PropTypes.object,
  //   user: PropTypes.object,
  // };
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
  ConnectedComponent.displayName = `${getDisplayName$1(WrappedComponent)}`;
  return ConnectedComponent;
};

export { ForgotPassword_container as ForgotPasswordContainer, Login_container as LoginContainer, Registration_container as RegistrationContainer, ResetPassword_container as ResetPasswordContainer, User_container as UserContainer, actions, useForgotPassword, useLogin, useRegistration, useResetPassword, useUser, withLogin, withRegistration };
//# sourceMappingURL=user.js.map
