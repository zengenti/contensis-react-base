import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/features/input/components/Button';
import Link from '~/features/link';

const LogoutForm = ({ logoutUser, user }) => {
  return (
    <div className="logoutContainer">
      <h1 className="logoutTitle">Welcome, {user.name}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          logoutUser('/');
        }}
        className="login-form"
      >
        <Button type="submit" className="logoutSubmit" label="Logout" />
        <Link className="helpdeskLink" uri="/help-and-docs/help-desk">
          Go to helpdesk
        </Link>
      </form>
    </div>
  );
};

LogoutForm.propTypes = {
  logoutUser: PropTypes.func,
  user: PropTypes.object,
};

export default LogoutForm;
