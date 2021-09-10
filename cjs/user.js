'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactRedux = require('react-redux');
require('jsonpath-mapper');
require('immer');
require('./actions-661a0e96.js');
var reducers = require('./reducers-fde41d6b.js');
require('@redux-saga/core/effects');
var selectors = require('./selectors-1db80394.js');
require('query-string');
var matchGroups = require('./matchGroups-7315f0a3.js');
var login = require('./login-8d349faf.js');
require('await-to-js');
require('js-cookie');

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
    authenticationError: select(matchGroups.selectUserAuthenticationError),
    authenticationErrorMessage: select(matchGroups.selectUserAuthenticationErrorMessage),
    error: select(matchGroups.selectUserError),
    errorMessage: select(matchGroups.selectUserErrorMessage),
    isAuthenticated: select(matchGroups.selectUserIsAuthenticated),
    isLoading: select(matchGroups.selectUserIsLoading),
    user: select(matchGroups.selectUser)
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

const useRegistration = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    error: select(matchGroups.selectUserRegistrationError),
    isLoading: select(matchGroups.selectUserRegistrationIsLoading),
    isSuccess: select(matchGroups.selectUserRegistrationIsSuccess),
    user: select(matchGroups.selectUserRegistration)
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

const useForgotPassword = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    isLoading: select(matchGroups.selectPasswordResetRequestSending),
    isSuccess: select(matchGroups.selectPasswordResetRequestSent),
    error: select(matchGroups.selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject => dispatch(requestPasswordReset(userEmailObject)),
    setNewPassword: {
      queryString: select(selectors.selectCurrentSearch),
      isLoading: select(matchGroups.selectResetPasswordSending),
      isSuccess: select(matchGroups.selectResetPasswordSent),
      error: select(matchGroups.selectResetPasswordError),
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

const useChangePassword = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    isLoading: select(matchGroups.selectChangePasswordSending),
    isSuccess: select(matchGroups.selectChangePasswordSent),
    isLoggedIn: select(matchGroups.selectUserIsAuthenticated),
    error: select(matchGroups.selectChangePasswordError),
    authenticationErrorMessage: select(matchGroups.selectUserAuthenticationErrorMessage),
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

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      authenticationError: matchGroups.selectUserAuthenticationError(state),
      error: matchGroups.selectUserError(state),
      isAuthenticated: matchGroups.selectUserIsAuthenticated(state),
      isLoading: matchGroups.selectUserIsLoading(state),
      user: matchGroups.selectUser(state)
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser
  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

const getDisplayName$1 = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withRegistration = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      error: matchGroups.selectUserRegistrationError(state),
      isLoading: matchGroups.selectUserRegistrationIsLoading(state),
      isSuccess: matchGroups.selectUserRegistrationIsSuccess(state),
      user: matchGroups.selectUserRegistration(state)
    };
  };

  const mapDispatchToProps = {
    registerUser
  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
  ConnectedComponent.displayName = `${getDisplayName$1(WrappedComponent)}`;
  return ConnectedComponent;
};

exports.initialUserState = reducers.initialUserState;
exports.reducer = reducers.UserReducer;
exports.types = reducers.types;
exports.selectors = matchGroups.selectors;
exports.LoginHelper = login.LoginHelper;
exports.handleRequiresLoginSaga = login.handleRequiresLoginSaga;
exports.refreshSecurityToken = login.refreshSecurityToken;
exports.ChangePassword = ChangePasswordContainer;
exports.ForgotPasswordContainer = ForgotPasswordContainer;
exports.LoginContainer = LoginContainer;
exports.RegistrationContainer = RegistrationContainer;
exports.actions = actions;
exports.useChangePassword = useChangePassword;
exports.useForgotPassword = useForgotPassword;
exports.useLogin = useLogin;
exports.useRegistration = useRegistration;
exports.withLogin = withLogin;
exports.withRegistration = withRegistration;
//# sourceMappingURL=user.js.map
