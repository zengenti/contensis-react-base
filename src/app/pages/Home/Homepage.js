import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRoute } from '~/core/redux/actions/routing';
import { selectCurrentHostname } from '~/core/redux/selectors/routing';
// import LoginButton from '~/features/login/components/LoginButton';

const Homepage = ({ entry }) => {
  const dispatch = useDispatch();

  const hostname = useSelector(selectCurrentHostname);

  const changeRoute = (path = '/zenInfo') => {
    dispatch(setRoute(path));
  };

  return (
    <>
      <h1>Hello world {entry && entry.entryTitle}</h1>

      <p>
        <Link to="/zenInfo">ZenInfo</Link>
      </p>
      <button onClick={() => changeRoute()}>Change Route</button>
      <button onClick={() => changeRoute('/account/login?redirect_uri=/')}>
        Go to Login
      </button>
      <button
        onClick={() =>
          changeRoute(
            '/account/registration?redirect_uri=/account/registration/success'
          )
        }
      >
        Go to Registration
      </button>
      <p>Entry pages (at contensis.zenhub)</p>
      <ul>
        <li>
          <Link to="/help-and-docs/apis/image-api/effects/blur">
            Gaussian blur (auth required by static route pattern match)
          </Link>
        </li>
        <li>
          <Link to="/terms-of-use">
            Terms of use (auth required by content type)
          </Link>
        </li>
        <li>
          <Link to="/something">Something to trigger 404</Link>
        </li>
      </ul>
      <p>{hostname}</p>
      {/* <LoginButton text="Sign in here" /> */}
    </>
  );
};

Homepage.propTypes = {
  entry: PropTypes.object,
  setRoute: PropTypes.func,
};

export default Homepage;
