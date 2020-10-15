import 'react';
import { connect } from 'react-redux';
import 'immutable';
import { r as selectUser, y as selectUserMessage, z as selectLoginScreenMode, A as selectPasswordMessage, B as selectChangePasswordMessage, D as selectCaptchaSiteKey, E as selectCaptchaResponse, l as selectUserLoggedIn, o as selectCurrentPath, F as selectQueryStringAsObject } from './selectors-99d4c59c.js';
export { x as selectors } from './selectors-99d4c59c.js';
import 'query-string';
export { e as LoginHelper, a as types } from './sagas-9eaded2b.js';
import { l as loginUser, a as logoutUser, t as toggleLoginMode, f as forgotPassword, c as changePassword, b as changePasswordWithToken, s as setRecaptchaResponse } from './actions-e961f7ca.js';
export { u as actions } from './actions-e961f7ca.js';
import 'redux-saga/effects';
import 'js-cookie';
import { t as toJS } from './ToJs-1649f545.js';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  // Returns a redux-connected component with the following props:
  // this.propTypes = {
  //   loginUser: PropTypes.func,
  //   logoutUser: PropTypes.func,
  //   user: PropTypes.object,
  // };
  const mapStateToProps = state => {
    return {
      user: selectUser(state),
      userMessage: selectUserMessage(state),
      screenMode: selectLoginScreenMode(state),
      passwordMessage: selectPasswordMessage(state),
      changePasswordMessage: selectChangePasswordMessage(state),
      captchaSiteKey: selectCaptchaSiteKey(state),
      isHuman: selectCaptchaResponse(state),
      isLoggedIn: selectUserLoggedIn(state),
      currentPath: selectCurrentPath(state),
      queryString: selectQueryStringAsObject(state)
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser,
    toggleLoginMode,
    forgotPassword,
    changePassword,
    changePasswordWithToken,
    captchaResponse: setRecaptchaResponse
  };
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

export { withLogin };
//# sourceMappingURL=user.js.map
