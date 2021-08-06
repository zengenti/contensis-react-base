import useLogin from './useLogin';
import { toJS } from '~/util/ToJs';

const LoginContainer = ({ children, ...props }) => {
  const userProps = useLogin(props);
  return children(userProps);
};

LoginContainer.propTypes = {};

export default toJS(LoginContainer);
