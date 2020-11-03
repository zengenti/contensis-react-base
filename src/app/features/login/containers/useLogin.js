import { useDispatch, useSelector } from 'react-redux';
import { createUserAccount, loginUser, logoutUser } from '../redux/actions';
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
    registerUser: (firstName, lastName, email, password, passwordConfirm) =>
      dispatch(
        createUserAccount(firstName, lastName, email, password, passwordConfirm)
      ),
    authenticationError: select(selectUserAuthenticationError),
    error: select(selectUserError),
    isAuthenticated: select(selectUserIsAuthenticated),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser).toJS(),
  };
};

export default useLogin;
