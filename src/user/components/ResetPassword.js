import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const ResetPassword = ({
  // className,
  queryString,
  error,
  isLoading,
  isSuccess,
  resetPassword,
}) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });

  const queryStringParams = new URLSearchParams(queryString);
  const passwordResetToken = queryStringParams.get('token');

  const onSubmit = data => {
    if (isLoading) return;
    if (!passwordResetToken) {
      alert('Missing token!');
      return;
    }
    if (data.password !== data.repeatPassword) {
      alert('Passwords must match');
      return;
    }
    // alert(JSON.stringify(data));
    resetPassword({
      token: passwordResetToken,
      password: data.password,
    });
  };

  return (
    <>
      {!isSuccess && (
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                ref={register({
                  required: true,
                })}
              />
              {errors.password && 'Please enter a valid password'}
            </div>
            <div className="form__field">
              <label htmlFor="repeatPassword">Repeat password</label>
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                ref={register({
                  required: true,
                })}
              />
              {errors.repeatPassword && 'Please enter a valid repeat password'}
            </div>
            <div className="form__submit">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      )}
      {isSuccess && (
        <div>
          <h1>Success</h1>
          <p>
            Thank you! The password reset email has been sent to your inbox -
            please check your junk or spam folder if it does not arrive within
            the next few minutes. The link will remain valid for 1 hour.
          </p>
        </div>
      )}
      {!!error && !isSuccess && (
        <div className="errorContainer">
          <h2>There was a problem with the request.</h2>
          <p>Please try again.</p>
        </div>
      )}
    </>
  );
};

ResetPassword.propTypes = {
  className: PropTypes.string,
  queryString: PropTypes.string,
  resetPassword: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

export default ResetPassword;
