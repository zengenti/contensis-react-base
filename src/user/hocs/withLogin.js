import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions';
import {
  selectUser,
  selectUserAuthenticationError,
  selectUserError,
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
      authenticationError: selectUserAuthenticationError(state),
      error: selectUserError(state),
      isAuthenticated: selectUserIsAuthenticated(state),
      isLoading: selectUserIsLoading(state),
      user: selectUser(state),
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
