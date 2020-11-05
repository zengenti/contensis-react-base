import 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import 'immutable';
import { q as action } from './routing-1f866fda.js';
import { L as LOGIN_USER, a as LOGOUT_USER, C as CREATE_USER_ACCOUNT, s as selectUserAuthenticationError, b as selectUserError, c as selectUserIsAuthenticated, d as selectUserIsLoading, e as selectUser } from './sagas-c59e8024.js';
export { j as LoginHelper, h as handleRequiresLoginSaga, i as initialUserState, U as reducer, r as refreshSecurityToken, g as selectors, t as types } from './sagas-c59e8024.js';
import 'query-string';
import 'redux-saga/effects';
import 'contensis-management-api';
import 'await-to-js';
import 'js-cookie';
import 'jsonpath-mapper';
import { t as toJS } from './ToJs-1649f545.js';

const loginUser = (username, password) => action(LOGIN_USER, {
  username,
  password
}); // export const validateUser = cookies => action(VALIDATE_USER, { cookies });

const logoutUser = redirectPath => action(LOGOUT_USER, {
  redirectPath
}); // export const toggleLoginMode = () => action(TOGGLE_LOGIN_MODE);

const createUserAccount = (firstName, lastName, email, password, passwordConfirm) => action(CREATE_USER_ACCOUNT, {
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
      authenticationError: selectUserAuthenticationError(state),
      error: selectUserError(state),
      isAuthenticated: selectUserIsAuthenticated(state),
      isLoading: selectUserIsLoading(state),
      user: selectUser(state)
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
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

const useLogin = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    registerUser: (firstName, lastName, email, password, passwordConfirm) => dispatch(createUserAccount(firstName, lastName, email, password, passwordConfirm)),
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

export { Login_container as LoginContainer, actions, useLogin, withLogin };
//# sourceMappingURL=user.js.map
