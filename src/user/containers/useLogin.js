import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions';
import {
  selectUser,
  selectUserAuthenticationError,
  selectUserError,
  selectUserIsAuthenticated,
  selectUserIsLoading,
} from '../redux/selectors';

const useLogin = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    authenticationError: select(selectUserAuthenticationError),
    error: select(selectUserError),
    isAuthenticated: select(selectUserIsAuthenticated),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser).toJS(),
  };
};

export default useLogin;
