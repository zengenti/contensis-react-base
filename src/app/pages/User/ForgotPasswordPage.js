import React from 'react';
import ForgotPassword from '~/features/login/components/ForgotPassword';
import ForgotPasswordContainer from '~/features/login/containers/ForgotPassword.container';

const ForgotPasswordPage = () => {
  return (
    <ForgotPasswordContainer>
      {userProps => <ForgotPassword {...userProps} />}
    </ForgotPasswordContainer>
  );
};

export default ForgotPasswordPage;
