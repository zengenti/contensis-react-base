import useRegistration from './useRegistration';
import { toJS } from '~/core/util/ToJs';

const RegistrationContainer = ({ children, ...props }) => {
  const userProps = useRegistration(props);
  return children(userProps);
};

RegistrationContainer.propTypes = {};

export default toJS(RegistrationContainer);
