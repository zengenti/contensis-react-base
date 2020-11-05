'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var reactRedux = require('react-redux');
require('immutable');
var routing = require('./routing-1b06bbe2.js');
var sagas = require('./sagas-c1c7f51e.js');
require('query-string');
require('redux-saga/effects');
require('contensis-management-api');
require('await-to-js');
require('js-cookie');
require('jsonpath-mapper');
var ToJs = require('./ToJs-d548b71b.js');

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
      authenticationError: sagas.selectUserAuthenticationError(state),
      error: sagas.selectUserError(state),
      isAuthenticated: sagas.selectUserIsAuthenticated(state),
      isLoading: sagas.selectUserIsLoading(state),
      user: sagas.selectUser(state)
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
    authenticationError: select(sagas.selectUserAuthenticationError),
    error: select(sagas.selectUserError),
    isAuthenticated: select(sagas.selectUserIsAuthenticated),
    isLoading: select(sagas.selectUserIsLoading),
    user: select(sagas.selectUser).toJS()
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
exports.selectors = sagas.selectors;
exports.types = sagas.types;
exports.LoginContainer = Login_container;
exports.actions = actions;
exports.useLogin = useLogin;
exports.withLogin = withLogin;
//# sourceMappingURL=user.js.map
