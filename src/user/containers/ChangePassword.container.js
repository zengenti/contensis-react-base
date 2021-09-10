import useChangePassword from '../hooks/useChangePassword';

const ChangePasswordContainer = ({ children, ...props }) => {
  const userProps = useChangePassword(props);
  return children(userProps);
};

ChangePasswordContainer.propTypes = {};

export default ChangePasswordContainer;
