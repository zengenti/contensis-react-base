import 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import 'immutable';
import { B as action } from './routing-2c78fa4d.js';
import { L as LOGIN_USER, c as LOGOUT_USER, R as REGISTER_USER } from './reducers-ed7581c0.js';
export { i as initialUserState, U as reducer, t as types } from './reducers-ed7581c0.js';
import 'query-string';
import '@redux-saga/core/effects';
import { c as selectUserAuthenticationError, d as selectUserError, s as selectUserIsAuthenticated, e as selectUserIsLoading, f as selectUser, t as toJS, g as selectUserRegistrationError, h as selectUserRegistrationIsLoading, i as selectUserRegistrationIsSuccess, j as selectUserRegistration } from './ToJs-020d9abb.js';
export { k as selectors } from './ToJs-020d9abb.js';
export { L as LoginHelper, h as handleRequiresLoginSaga, r as refreshSecurityToken } from './login-2f422988.js';
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

var actions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  loginUser: loginUser,
  logoutUser: logoutUser,
  registerUser: registerUser
});

const useLogin = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    authenticationError: select(selectUserAuthenticationError),
    error: select(selectUserError),
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

const useLogin$1 = () => {
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
  const userProps = useLogin$1();
  return children(userProps);
};

RegistrationContainer.propTypes = {};
var Registration_container = toJS(RegistrationContainer);

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

export { Login_container as LoginContainer, Registration_container as RegistrationContainer, actions, useLogin, useLogin$1 as useRegistration, withLogin, withRegistration };
//# sourceMappingURL=user.js.map
