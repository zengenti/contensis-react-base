'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var login = require('./login-840860bc.js');
var reactRedux = require('react-redux');
var selectors = require('./selectors-656da4b7.js');
var reducers = require('./reducers-3a4f8971.js');
var ToJs = require('./ToJs-a9a8522b.js');
require('@redux-saga/core/effects');
require('./actions-8dc9e8de.js');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
require('query-string');
require('immer');
require('react');

const loginUser = (username, password) => selectors.action(reducers.LOGIN_USER, {
  username,
  password
});
const logoutUser = redirectPath => selectors.action(reducers.LOGOUT_USER, {
  redirectPath
});
const registerUser = (user, mappers) => selectors.action(reducers.REGISTER_USER, {
  user,
  mappers
});
const requestPasswordReset = userEmailObject => selectors.action(reducers.REQUEST_USER_PASSWORD_RESET, {
  userEmailObject
});
const resetPassword = resetPasswordObject => selectors.action(reducers.RESET_USER_PASSWORD, {
  resetPasswordObject
});
const changePassword = (userId, currentPassword, newPassword) => selectors.action(reducers.CHANGE_USER_PASSWORD, {
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
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    errorMessage: select(ToJs.selectUserErrorMessage),
    isAuthenticated: select(ToJs.selectUserIsAuthenticated),
    isAuthenticationError: select(ToJs.selectUserIsAuthenticationError),
    isError: select(ToJs.selectUserIsError),
    isLoading: select(ToJs.selectUserIsLoading),
    user: select(ToJs.selectUser),
    // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
    authenticationError: select(ToJs.selectUserIsAuthenticationError),
    // DEPRECATED: authenticationErrorMessage is deprecated use errorMessage instead
    authenticationErrorMessage: select(ToJs.selectUserErrorMessage),
    // DEPRECATED: error is deprecated use isError instead
    error: select(ToJs.selectUserIsError)
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
var Login_container = ToJs.toJS(LoginContainer);

const useRegistration = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    error: select(ToJs.selectUserRegistrationError),
    isLoading: select(ToJs.selectUserRegistrationIsLoading),
    isSuccess: select(ToJs.selectUserRegistrationIsSuccess),
    user: select(ToJs.selectUserRegistration)
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
var Registration_container = ToJs.toJS(RegistrationContainer);

const useForgotPassword = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    isLoading: select(ToJs.selectPasswordResetRequestSending),
    isSuccess: select(ToJs.selectPasswordResetRequestSent),
    error: select(ToJs.selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject)),
    setNewPassword: {
      queryString: select(selectors.selectCurrentSearch),
      isLoading: select(ToJs.selectResetPasswordSending),
      isSuccess: select(ToJs.selectResetPasswordSent),
      error: select(ToJs.selectResetPasswordError),
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
var ForgotPassword_container = ToJs.toJS(ForgotPasswordContainer);

const useChangePassword = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    isLoading: select(ToJs.selectChangePasswordSending),
    isSuccess: select(ToJs.selectChangePasswordSent),
    userId: select(ToJs.selectUserGuid),
    isLoggedIn: select(ToJs.selectUserIsAuthenticated),
    error: select(ToJs.selectChangePasswordError),
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
var ChangePassword_container = ToJs.toJS(ChangePasswordContainer);

const getDisplayName$1 = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  const mapStateToProps = state => {
    return {
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

  const mapDispatchToProps = {
    loginUser,
    logoutUser
  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName$1(WrappedComponent)}`;
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
    registerUser
  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

exports.LoginHelper = login.LoginHelper;
exports.handleRequiresLoginSaga = login.handleRequiresLoginSaga;
exports.refreshSecurityToken = login.refreshSecurityToken;
exports.initialUserState = reducers.initialUserState;
exports.reducer = reducers.UserReducer;
exports.types = reducers.types;
exports.selectors = ToJs.selectors;
exports.ChangePassword = ChangePassword_container;
exports.ForgotPasswordContainer = ForgotPassword_container;
exports.LoginContainer = Login_container;
exports.RegistrationContainer = Registration_container;
exports.actions = actions;
exports.useChangePassword = useChangePassword;
exports.useForgotPassword = useForgotPassword;
exports.useLogin = useLogin;
exports.useRegistration = useRegistration;
exports.withLogin = withLogin;
exports.withRegistration = withRegistration;
//# sourceMappingURL=user.js.map
