import React from 'react';
import PropTypes from 'prop-types';
import LoginStyled from '../components.styled/Login.styled';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import { toJS } from '~/util/ToJs';

const Login = ({
  errorMessage,
  isAuthenticated,
  isLoading,
  user,
  loginUser,
  logoutUser,
}) => {
  return (
    <LoginStyled>
      <div className="lContainer">
        {!isAuthenticated && (
          <>
            <h1 className="lTitle">Log in to Contensis help desk</h1>
            <LoginForm
              isLoading={isLoading}
              authenticationError={errorMessage}
              loginUser={loginUser}
            />
          </>
        )}
        {isAuthenticated && (
          <>
            <LogoutForm logoutUser={logoutUser} user={user} />
          </>
        )}
        <LogoutForm logoutUser={logoutUser} user={user} />
      </div>
    </LoginStyled>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
  isLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
};

export default toJS(Login);
