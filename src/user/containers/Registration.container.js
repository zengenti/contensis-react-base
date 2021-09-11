import useRegistration from '../hooks/useRegistration';
import { toJS } from '~/util/ToJs';

const RegistrationContainer = ({ children, ...props }) => {
  const userProps = useRegistration(props);
  return children(userProps);
};

RegistrationContainer.propTypes = {};

export default toJS(RegistrationContainer);
