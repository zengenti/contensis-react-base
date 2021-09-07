import useForgotPassword from './useForgotPassword';
import { toJS } from '~/util/ToJs';

const ForgotPasswordContainer = ({ children, ...props }) => {
  const userProps = useForgotPassword(props);
  return children(userProps);
};

ForgotPasswordContainer.propTypes = {};

export default toJS(ForgotPasswordContainer);
