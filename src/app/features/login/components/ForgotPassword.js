import React from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const ForgotPassword = ({
  // className,
  requestPasswordReset,
  isLoading,
  isSuccess,
  error,
}) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onChange' });

  const onSubmit = data => {
    if (isLoading) return;
    // alert(JSON.stringify(data));
    requestPasswordReset({
      userEmail: data.email,
    });
  };

  return (
    <>
      {!isSuccess && (
        <div className="formContainer">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__field">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                ref={register({
                  required: true,
                  // eslint-disable-next-line no-useless-escape
                  // pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && 'Please enter a valid email address'}
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

ForgotPassword.propTypes = {
  className: PropTypes.string,
  requestPasswordReset: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isLoading: PropTypes.bool,
  isSuccess: PropTypes.bool,
};

export default ForgotPassword;
