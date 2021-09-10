import useLogin from '../hooks/useLogin';

const LoginContainer = ({ children, ...props }) => {
  const userProps = useLogin(props);
  return children(userProps);
};

LoginContainer.propTypes = {};

export default LoginContainer;
