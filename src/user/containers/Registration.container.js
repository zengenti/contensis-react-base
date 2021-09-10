import useRegistration from '../hooks/useRegistration';

const RegistrationContainer = ({ children, ...props }) => {
  const userProps = useRegistration(props);
  return children(userProps);
};

RegistrationContainer.propTypes = {};

export default RegistrationContainer;
