'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var reactRedux = require('react-redux');
require('jsonpath-mapper');
require('immutable');
require('immer');
var actions$1 = require('./actions-e9f69947.js');
var reducers = require('./reducers-ec0c8c3a.js');
require('@redux-saga/core/effects');
require('query-string');
var selectors = require('./selectors-1295124a.js');
var ToJs = require('./ToJs-79922828.js');
var login = require('./login-2df2ce8f.js');
require('await-to-js');
require('js-cookie');

const loginUser = (username, password) => actions$1.action(reducers.LOGIN_USER, {
  username,
  password
});
const logoutUser = redirectPath => actions$1.action(reducers.LOGOUT_USER, {
  redirectPath
});
const registerUser = (user, mappers) => actions$1.action(reducers.REGISTER_USER, {
  user,
  mappers
});
const requestPasswordReset = userEmailObject => actions$1.action(reducers.REQUEST_USER_PASSWORD_RESET, {
  userEmailObject
});
const resetPassword = resetPasswordObject => actions$1.action(reducers.RESET_USER_PASSWORD, {
  resetPasswordObject
});
const changePassword = (userId, currentPassword, newPassword) => actions$1.action(reducers.CHANGE_USER_PASSWORD, {
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
    authenticationError: select(ToJs.selectUserAuthenticationError),
    authenticationErrorMessage: select(ToJs.selectUserAuthenticationErrorMessage),
    error: select(ToJs.selectUserError),
    errorMessage: select(ToJs.selectUserErrorMessage),
    isAuthenticated: select(ToJs.selectUserIsAuthenticated),
    isLoading: select(ToJs.selectUserIsLoading),
    user: select(ToJs.selectUser).toJS()
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
    user: select(ToJs.selectUserRegistration).toJS()
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
    isLoggedIn: select(ToJs.selectUserIsAuthenticated),
    error: select(ToJs.selectChangePasswordError),
    authenticationErrorMessage: select(ToJs.selectUserAuthenticationErrorMessage),
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

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      authenticationError: ToJs.selectUserAuthenticationError(state),
      error: ToJs.selectUserError(state),
      isAuthenticated: ToJs.selectUserIsAuthenticated(state),
      isLoading: ToJs.selectUserIsLoading(state),
      user: ToJs.selectUser(state)
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser
  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

const getDisplayName$1 = WrappedComponent => {
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
  ConnectedComponent.displayName = `${getDisplayName$1(WrappedComponent)}`;
  return ConnectedComponent;
};

exports.initialUserState = reducers.initialUserState;
exports.reducer = reducers.UserReducer;
exports.types = reducers.types;
exports.selectors = ToJs.selectors;
exports.LoginHelper = login.LoginHelper;
exports.handleRequiresLoginSaga = login.handleRequiresLoginSaga;
exports.refreshSecurityToken = login.refreshSecurityToken;
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
