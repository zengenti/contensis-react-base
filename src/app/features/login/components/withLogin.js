import { connect } from 'react-redux';
import {
  loginUser,
  logoutUser,
  toggleLoginMode,
  forgotPassword,
  changePassword,
  changePasswordWithToken,
  setRecaptchaResponse,
} from '../redux/actions';
import {
  selectUser,
  selectUserMessage,
  selectLoginScreenMode,
  selectPasswordMessage,
  selectChangePasswordMessage,
  selectCaptchaSiteKey,
  selectCaptchaResponse,
} from '../redux/selectors';
import { toJS } from '~/core/util/ToJs';
import {
  selectCurrentPath,
  selectQueryStringAsObject,
} from '~/core/redux/selectors/routing';

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
      currentPath: selectCurrentPath(state),
      queryString: selectQueryStringAsObject(state),
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser,
    toggleLoginMode,
    forgotPassword,
    changePassword,
    changePasswordWithToken,
    captchaResponse: setRecaptchaResponse,
  };

  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(WrappedComponent));

  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;

  return ConnectedComponent;
};

export default withLogin;
