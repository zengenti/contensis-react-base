import { connect } from 'react-redux';
import { registerUser } from '../redux/actions';
import {
  selectUserRegistration,
  selectUserRegistrationError,
  selectUserRegistrationIsLoading,
  selectUserRegistrationIsSuccess,
} from '../redux/selectors';

const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withRegistration = WrappedComponent => {
  const mapStateToProps = state => {
    return {
      error: selectUserRegistrationError(state),
      isLoading: selectUserRegistrationIsLoading(state),
      isSuccess: selectUserRegistrationIsSuccess(state),
      user: selectUserRegistration(state),
    };
  };

  const mapDispatchToProps = {
    registerUser,
  };

  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedComponent);

  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;

  return ConnectedComponent;
};

export default withRegistration;
