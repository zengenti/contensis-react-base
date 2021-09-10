import useForgotPassword from '../hooks/useForgotPassword';

const ForgotPasswordContainer = ({ children, ...props }) => {
  const userProps = useForgotPassword(props);
  return children(userProps);
};

ForgotPasswordContainer.propTypes = {};

export default ForgotPasswordContainer;
