import { toJS } from '~/core/util/ToJs';
import useUser from './useUser';

const UserContainer = ({ children, ...props }) => {
  const userProps = useUser(props);
  return children(userProps);
};

UserContainer.propTypes = {};

export default toJS(UserContainer);
