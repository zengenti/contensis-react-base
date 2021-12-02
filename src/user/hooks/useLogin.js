import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../redux/actions';
import {
  selectUser,
  selectUserIsAuthenticationError,
  selectUserIsError,
  selectUserErrorMessage,
  selectUserIsAuthenticated,
  selectUserIsLoading,
} from '../redux/selectors';

const useLogin = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    errorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    isAuthenticationError: select(selectUserIsAuthenticationError),
    isError: select(selectUserIsError),
    isLoading: select(selectUserIsLoading),
    user: select(selectUser),
    // DEPRECATED: authenticationError is deprecated use isAuthenticationError instead
    authenticationError: select(selectUserIsAuthenticationError),
    // DEPRECATED: authenticationErrorMessage is deprecated use errorMessage instead
    authenticationErrorMessage: select(selectUserErrorMessage),
    // DEPRECATED: error is deprecated use isError instead
    error: select(selectUserIsError),
  };
};

export default useLogin;
