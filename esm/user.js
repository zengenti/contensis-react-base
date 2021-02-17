import 'react';
import { connect } from 'react-redux';
import 'immutable';
import { t as selectUser, z as selectUserMessage, A as selectLoginScreenMode, B as selectPasswordMessage, D as selectChangePasswordMessage, E as selectCaptchaSiteKey, F as selectCaptchaResponse, m as selectUserLoggedIn, p as selectCurrentPath, G as selectQueryStringAsObject } from './selectors-cb8b1351.js';
export { y as selectors } from './selectors-cb8b1351.js';
import 'query-string';
export { e as LoginHelper, a as types } from './sagas-c842b0c1.js';
import { l as loginUser, a as logoutUser, t as toggleLoginMode, f as forgotPassword, c as changePassword, b as changePasswordWithToken, s as setRecaptchaResponse } from './actions-e0b6552b.js';
export { u as actions } from './actions-e0b6552b.js';
import '@redux-saga/core/effects';
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
