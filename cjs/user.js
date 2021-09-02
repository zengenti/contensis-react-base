'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var login = require('./login-f4ec010d.js');
var reactRedux = require('react-redux');
var actions$1 = require('./actions-0e6615b5.js');
var reducers = require('./reducers-3f2c29e6.js');
var ToJs = require('./ToJs-f968ac6c.js');
require('immutable');
require('@redux-saga/core/effects');
require('./selectors-5085f27f.js');
require('query-string');
require('jsonpath-mapper');
require('await-to-js');
require('js-cookie');
require('immer');
require('react');

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

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loginUser: loginUser,
  logoutUser: logoutUser,
  registerUser: registerUser
});

const useLogin$1 = () => {
  const dispatch = reactRedux.useDispatch();
  const select = reactRedux.useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
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
  const userProps = useLogin$1();
  return children(userProps);
};

LoginContainer.propTypes = {};
var Login_container = ToJs.toJS(LoginContainer);

const useLogin = () => {
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
  const userProps = useLogin();
  return children(userProps);
};

RegistrationContainer.propTypes = {};
var Registration_container = ToJs.toJS(RegistrationContainer);

const getDisplayName$1 = WrappedComponent => {
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
exports.LoginContainer = Login_container;
exports.RegistrationContainer = Registration_container;
exports.actions = actions;
exports.useLogin = useLogin$1;
exports.useRegistration = useLogin;
exports.withLogin = withLogin;
exports.withRegistration = withRegistration;
//# sourceMappingURL=user.js.map
