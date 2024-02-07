import { useCookies } from 'react-cookie';
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
import { CookieHelper } from '../util/CookieHelper.class';

const useLogin = () => {
  const cookies = new CookieHelper(...useCookies());

  const dispatch = useDispatch();
  const select = useSelector;

  return {
    loginUser: (username: string, password: string) =>
      dispatch(loginUser(username, password, cookies)),
    logoutUser: (redirectPath?: string) =>
      dispatch(logoutUser(redirectPath, cookies)),
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
