import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import withLogin from './withLogin';
import { useSelector } from 'react-redux';
import {
  selectCurrentPath,
  selectCurrentSearch,
} from '~/core/redux/selectors/routing';
import { selectUser } from '~/features/login/redux/selectors';

const LoginButton = ({ text }) => {
  const [redirectUri, setRedirectUri] = useState(false);
  const currentPath = useSelector(selectCurrentPath);
  const currentSearch = useSelector(selectCurrentSearch);
  const user = useSelector(selectUser);

  const handleClick = e => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const uri = `/login?redirect_uri=${encodeURIComponent(
        currentPath + currentSearch
      )}`;
      setRedirectUri(uri);
    }
  };

  if (user && user.toJS().loggedIn) return null;

  return (
    <form onSubmit={handleClick} className="loginForm">
      <button type="submit" className="loginSubmit">
        {text || 'Login'}
      </button>
      {redirectUri && <Redirect to={redirectUri} />}
    </form>
  );
};
LoginButton.propTypes = {
  text: PropTypes.string,
};

export default withLogin(LoginButton);
