'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var reactRedux = require('react-redux');
require('immutable');
var routing = require('./routing-1b06bbe2.js');
var sagas = require('./sagas-14aeeb78.js');
require('query-string');
require('redux-saga/effects');
var ToJs = require('./ToJs-8dd77129.js');
require('contensis-management-api');
require('await-to-js');
require('js-cookie');
require('jsonpath-mapper');

const loginUser = (username, password) => routing.action(sagas.LOGIN_USER, {
  username,
  password
}); // export const validateUser = cookies => action(VALIDATE_USER, { cookies });

const logoutUser = redirectPath => routing.action(sagas.LOGOUT_USER, {
  redirectPath
}); // export const toggleLoginMode = () => action(TOGGLE_LOGIN_MODE);

const createUserAccount = (firstName, lastName, email, password, passwordConfirm) => routing.action(sagas.CREATE_USER_ACCOUNT, {
  firstName,
  lastName,
  email,
  password,
  passwordConfirm
});

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loginUser: loginUser,
  logoutUser: logoutUser,
  createUserAccount: createUserAccount
});

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
      authenticationError: ToJs.selectUserAuthenticationError(state),
      error: ToJs.selectUserError(state),
      isAuthenticated: ToJs.selectUserIsAuthenticated(state),
      isLoading: ToJs.selectUserIsLoading(state),
      user: ToJs.selectUser(state)
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser // toggleLoginMode,
    // forgotPassword,
    // changePassword,
    // changePasswordWithToken,
    // captchaResponse: setRecaptchaResponse,

  };
  const ConnectedComponent = reactRedux.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

const useLogin = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    registerUser: (firstName, lastName, email, password, passwordConfirm) => dispatch(createUserAccount(firstName, lastName, email, password, passwordConfirm)),
    authenticationError: select(ToJs.selectUserAuthenticationError),
    error: select(ToJs.selectUserError),
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

exports.LoginHelper = sagas.LoginHelper;
exports.handleRequiresLoginSaga = sagas.handleRequiresLoginSaga;
exports.initialUserState = sagas.initialUserState;
exports.reducer = sagas.UserReducer;
exports.refreshSecurityToken = sagas.refreshSecurityToken;
exports.types = sagas.types;
exports.selectors = ToJs.selectors;
exports.LoginContainer = Login_container;
exports.actions = actions;
exports.useLogin = useLogin;
exports.withLogin = withLogin;
//# sourceMappingURL=user.js.map
