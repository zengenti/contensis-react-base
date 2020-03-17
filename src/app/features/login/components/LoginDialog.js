import React from 'react';
import PropTypes from 'prop-types';
import withLogin from './withLogin';

const LoginDialog = ({ user, loginUser, logoutUser }) => {
  const login = e => {
    e.preventDefault();
    const usernameBox = document.getElementById('usernameBox');
    const passwordBox = document.getElementById('passwordBox');

    const username = usernameBox && usernameBox.value;
    const password = passwordBox && passwordBox.value;

    loginUser(username, password);
  };

  const logout = () => {
    logoutUser();
  };

  return (
    <>
      <h1 className="loginTitle">Login</h1>
      {user && user.failedLogin && (
        <p className="loginFail">{user.logonResult}</p>
      )}
      {(!user || !user.loggedIn) && (
        <form onSubmit={login} className="loginForm">
          <input
            type="text"
            id="usernameBox"
            title="user name"
            className="loginUser loginInput"
            placeholder="Username"
          />
          <input
            type="password"
            id="passwordBox"
            title="password"
            className="loginPass loginInput"
            placeholder="Password"
          />
          {/* <p className="loginForgot">
              <Link uri="/forgot-password">Forgot password?</Link>
            </p> */}
          <button type="submit" className="loginSubmit">
            Login
          </button>
        </form>
      )}
      {user && user.loggedIn && (
        <form onSubmit={logout} className="loginForm">
          <button type="submit" className="logoutSubmit">
            Logout
          </button>
        </form>
      )}
      <p className="loginRegister">
        <span>Don&#39;t have an account? </span>
        <a href="/register">Register here</a>
      </p>
    </>
  );
};
LoginDialog.propTypes = {
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
  user: PropTypes.object,
};

export default withLogin(LoginDialog);
