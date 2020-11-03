import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextInput from '~/features/input';
import Link from '~/features/link';

const Register = ({ registerUser }) => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const register = () => {
    const { firstName, lastName, email, password, passwordConfirm } = newUser;
    registerUser(firstName, lastName, email, password, passwordConfirm);
  };

  return (
    <>
      <h1 className="registerTitle">Register</h1>
      <form className="registerForm">
        <TextInput
          id="firstName"
          title="First name"
          name="firstName"
          className="input-firstName"
          placeholder="First name"
          label="First name"
          onChange={event =>
            setNewUser({ ...newUser, firstName: event.target.value })
          }
        />
        <TextInput
          id="lastName"
          title="Last name"
          name="lastName"
          className="input-lastName"
          placeholder="Last name"
          label="Last name"
          onChange={event =>
            setNewUser({ ...newUser, lastName: event.target.value })
          }
        />
        <TextInput
          id="email"
          title="Email"
          name="Email"
          className="input-email"
          placeholder="Email"
          label="Email"
          onChange={event =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />
        <TextInput
          id="password"
          title="Password"
          name="password"
          className="input-password"
          placeholder="Password"
          label="Password"
          type="password"
          onChange={event =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />
        <TextInput
          id="passwordConfirm"
          title="Confirm password"
          name="passwordConfirm"
          className="input-passwordConfirm"
          placeholder="Confirm password"
          label="Confirm password"
          type="password"
          onChange={event =>
            setNewUser({ ...newUser, passwordConfirm: event.target.value })
          }
        />
        <button className="button-registerCancel">Cancel</button>
        <button
          type="button"
          className="button-registerSubmit"
          onClick={register}
        >
          Register
        </button>
        <p>
          Or <Link to="/account/login">log in</Link> instead
        </p>
      </form>
    </>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func,
};

export default Register;
