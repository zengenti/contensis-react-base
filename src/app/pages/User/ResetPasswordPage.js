import React from 'react';
import ResetPassword from '~/features/login/components/ResetPassword';
import ResetPasswordContainer from '~/features/login/containers/ResetPassword.container';

const ResetPasswordPage = () => {
  return (
    <ResetPasswordContainer>
      {userProps => <ResetPassword {...userProps} />}
    </ResetPasswordContainer>
  );
};

export default ResetPasswordPage;
