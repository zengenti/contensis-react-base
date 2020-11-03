import React from 'react';
import LoginContainer from '~/features/login';
import LoginComponent from '~/features/login/components/Login';

const LoginPage = () => {
  return (
    <LoginContainer>
      {userProps => <LoginComponent {...userProps} />}
    </LoginContainer>
  );
};

export default LoginPage;
