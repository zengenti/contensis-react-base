'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var require$$4 = require('react-redux');
require('immutable');
var selectors = require('./selectors-6a739905.js');
require('query-string');
var sagas = require('./sagas-fc38143f.js');
var actions = require('./actions-cd7e16c6.js');
require('redux-saga/effects');
require('js-cookie');
var ToJs = require('./ToJs-5960e1fb.js');

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
      user: selectors.selectUser(state),
      userMessage: selectors.selectUserMessage(state),
      screenMode: selectors.selectLoginScreenMode(state),
      passwordMessage: selectors.selectPasswordMessage(state),
      changePasswordMessage: selectors.selectChangePasswordMessage(state),
      captchaSiteKey: selectors.selectCaptchaSiteKey(state),
      isHuman: selectors.selectCaptchaResponse(state),
      isLoggedIn: selectors.selectUserLoggedIn(state),
      currentPath: selectors.selectCurrentPath(state),
      queryString: selectors.selectQueryStringAsObject(state)
    };
  };

  const mapDispatchToProps = {
    loginUser: actions.loginUser,
    logoutUser: actions.logoutUser,
    toggleLoginMode: actions.toggleLoginMode,
    forgotPassword: actions.forgotPassword,
    changePassword: actions.changePassword,
    changePasswordWithToken: actions.changePasswordWithToken,
    captchaResponse: actions.setRecaptchaResponse
  };
  const ConnectedComponent = require$$4.connect(mapStateToProps, mapDispatchToProps)(ToJs.toJS(WrappedComponent));
  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;
  return ConnectedComponent;
};

exports.selectors = selectors.user;
exports.LoginHelper = sagas.LoginHelper;
exports.types = sagas.user;
exports.actions = actions.user;
exports.withLogin = withLogin;
//# sourceMappingURL=user.js.map
