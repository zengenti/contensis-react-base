import { connect } from 'react-redux';
import { registerUser } from '../redux/actions';
import {
  selectUserRegistration,
  selectUserRegistrationError,
  selectUserRegistrationIsLoading,
  selectUserRegistrationIsSuccess,
} from '../redux/selectors';
import { toJS } from '~/core/util/ToJs';

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
  )(toJS(WrappedComponent));

  ConnectedComponent.displayName = `${getDisplayName(WrappedComponent)}`;

  return ConnectedComponent;
};

export default withRegistration;
