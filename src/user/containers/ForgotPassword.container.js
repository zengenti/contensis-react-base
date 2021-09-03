import useForgotPassword from './useForgotPassword';
import { toJS } from '~/core/util/ToJs';

const ForgotPasswordContainer = ({ children, ...props }) => {
  const userProps = useForgotPassword(props);
  return children(userProps);
};

ForgotPasswordContainer.propTypes = {};

export default toJS(ForgotPasswordContainer);
