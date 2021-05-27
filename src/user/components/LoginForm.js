import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginFormStyled from '~/features/login/components.styled/LoginForm.styled';
import TextInput from '~/features/input/components/TextInput';
import Link from '~/features/link';
import Button from '~/features/input/components/Button';
import useKeyPress from '~/util/useKeyPress';
const LoginForm = ({
  loginException,
  authenticationError,
  loading,
  loginUser,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let enterPressed = useKeyPress('Enter');
  const handleLogin = () => {
    loginUser(username, password);
  };
  if (enterPressed) {
    handleLogin();
    enterPressed = false;
  }
  return (
    <LoginFormStyled>
      <form className="lfForm">
        <TextInput
          id="usernameBox"
          title="user name"
          className="lfUsername"
          placeholder="Username"
          label="Username"
          onChange={e => setUsername(e.target.value)}
        />
        <TextInput
          type="password"
          id="passwordBox"
          title="password"
          className="lfPassword"
          placeholder="Password"
          label="Password"
          onChange={e => setPassword(e.target.value)}
        />
        {/* <div className="lfContainer">
          <label htmlFor="savePassword" className="lfLabel">
            <input type="checkbox" id="savePassword" name="savePassword" />
            Save password
            <span className="lfCheckmark" />
          </label>
          <p className="lfForgot">
            <Link className="lfLink" uri="/forgot-password">
              Forgot password?
            </Link>
          </p>
        </div> */}
        {authenticationError && (
          <p className="lfFail">Incorrect username or password.</p>
        )}
        {loginException && (
          <p className="lfFail">An unexpected error has occurred.</p>
        )}
        <Button
          className="lfSubmit"
          action={handleLogin}
          disabled={loading}
          loading={loading}
          label="Login"
        />
        <span className="lfAvatar" />
        <Link className="lfNew" uri="/account/registration">
          Register a new help desk account
        </Link>
      </form>
    </LoginFormStyled>
  );
};
LoginForm.propTypes = {
  loginException: PropTypes.bool,
  authenticationError: PropTypes.bool,
  loading: PropTypes.bool,
  loginUser: PropTypes.func,
};

export default LoginForm;
