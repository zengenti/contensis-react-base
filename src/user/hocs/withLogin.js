import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions';
import {
  selectUser,
  selectUserIsAuthenticationError,
  selectUserIsError,
  selectUserIsAuthenticated,
  selectUserIsLoading,
} from '../redux/selectors';
import { toJS } from '~/util/ToJs';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withLogin = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      isAuthenticated: selectUserIsAuthenticated(state),
      isAuthenticationError: selectUserIsAuthenticationError(state),
      isError: selectUserIsError(state),
      isLoading: selectUserIsLoading(state),
      user: selectUser(state),
      // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
      authenticationError: selectUserIsAuthenticationError(state),
      // DEPRECATED: error is deprecated use isError instead
      error: selectUserIsError(state),
    };
  };

  const mapDispatchToProps = {
    loginUser,
    logoutUser,
  };

  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(WrappedComponent));

  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;

  return ConnectedComponent;
};

export default withLogin;
