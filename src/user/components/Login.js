import React from 'react';
import PropTypes from 'prop-types';
import LoginStyled from '../components.styled/Login.styled';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import { toJS } from '~/util/ToJs';

const Login = ({
  error,
  authenticationError,
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
              authenticationError={authenticationError}
              loginException={error}
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
  authenticationError: PropTypes.string,
  error: PropTypes.string,
  user: PropTypes.object,
  updateUserLoginState: PropTypes.func,
};

export default toJS(Login);
