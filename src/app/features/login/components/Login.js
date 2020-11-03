import React from 'react';
import PropTypes from 'prop-types';
import LoginStyled from '../components.styled/Login.styled';
import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

const Login = ({
  error,
  authenticationError,
  authenticated,
  loading,
  user,
  loginUser,
  logoutUser,
}) => {
  return (
    <LoginStyled>
      <div className="lContainer">
        {!authenticated && (
          <>
            <h1 className="lTitle">Log in to Contensis help desk</h1>
            <LoginForm
              loading={loading}
              authenticationError={authenticationError}
              loginException={error}
              loginUser={loginUser}
            />
          </>
        )}
        {authenticated && (
          <>
            <LogoutForm logoutUser={logoutUser} user={user} />
          </>
        )}
      </div>
    </LoginStyled>
  );
};
Login.propTypes = {
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool,
  authenticationError: PropTypes.bool,
  error: PropTypes.bool,
  user: PropTypes.object,
  updateUserLoginState: PropTypes.func,
};

export default Login;
