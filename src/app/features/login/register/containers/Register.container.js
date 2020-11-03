import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toJS } from '~/core/util/ToJs';

import RegisterComponent from '../components/Register';
import { logoutUser, createUserAccount } from '../../redux/actions/user';
import { selectUser } from '../../redux/selectors/user';

const Register = props => {
  return <RegisterComponent {...props} />;
};

Register.propTypes = {
  user: PropTypes.object,
  registerUser: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    user: selectUser(state),
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutUser()),
    registerUser: (firstName, lastName, email, password, passwordConfirm) =>
      dispatch(
        createUserAccount(firstName, lastName, email, password, passwordConfirm)
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Register));
