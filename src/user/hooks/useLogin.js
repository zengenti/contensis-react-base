import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, verifyTwoFa } from '../redux/actions';
import {
  selectUser,
  selectUserIsAuthenticationError,
  selectUserIsError,
  selectUserErrorMessage,
  selectUserIsAuthenticated,
  selectUserIsLoading,
  selectUserRequiresTwoFa,
} from '../redux/selectors';

const useLogin = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    verifyTwoFa: twoFaToken => dispatch(verifyTwoFa(twoFaToken)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    errorMessage: select(selectUserErrorMessage),
    requiresTwoFa: select(selectUserRequiresTwoFa),
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
