import useChangePassword from '../hooks/useChangePassword';
import { toJS } from '~/util/ToJs';

const ChangePasswordContainer = ({ children, ...props }) => {
  const userProps = useChangePassword(props);
  return children(userProps);
};

ChangePasswordContainer.propTypes = {};

export default toJS(ChangePasswordContainer);
