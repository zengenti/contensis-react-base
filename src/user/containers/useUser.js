import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentSearch } from '~/core/redux/selectors/routing';
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
  resetPassword,
} from '../redux/actions';
import {
  selectUser,
  selectUserAuthenticationError,
  selectUserError,
  selectUserIsAuthenticated,
  selectUserIsLoading,
  selectUserRegistrationError,
  selectUserRegistrationIsLoading,
  selectUserRegistrationIsSuccess,
  selectUserRegistration,
  selectPasswordResetRequestSending,
  selectPasswordResetRequestSent,
  selectPasswordResetRequestError,
  selectResetPasswordSending,
  selectResetPasswordSent,
  selectResetPasswordError,
  selectUserAuthenticationErrorMessage,
  selectUserErrorMessage,
  selectChangePasswordSending,
  selectChangePasswordSent,
  selectChangePasswordError,
  selectUserGuid,
} from '../redux/selectors';

const useUser = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    logoutUser: redirectPath => dispatch(logoutUser(redirectPath)),
    authenticationError: select(selectUserAuthenticationError),
    authenticationErrorMessage: select(selectUserAuthenticationErrorMessage),
    userError: select(selectUserError),
    userErrorMessage: select(selectUserErrorMessage),
    isAuthenticated: select(selectUserIsAuthenticated),
    userIsLoading: select(selectUserIsLoading),
    user: select(selectUser).toJS(),
    userId: select(selectUserGuid),

    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    registrationError: select(selectUserRegistrationError),
    registrationIsLoading: select(selectUserRegistrationIsLoading),
    registrationIsSuccess: select(selectUserRegistrationIsSuccess),
    userRegistration: select(selectUserRegistration).toJS(),

    passwordResetRequestIsLoading: select(selectPasswordResetRequestSending),
    passwordResetRequestIsSuccess: select(selectPasswordResetRequestSent),
    passwordResetRequestError: select(selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject =>
      dispatch(requestPasswordReset(userEmailObject)),

    queryString: select(selectCurrentSearch),
    passwordResetIsLoading: select(selectResetPasswordSending),
    passwordResetIsSuccess: select(selectResetPasswordSent),
    passwordResetError: select(selectResetPasswordError),
    resetPassword: resetPasswordObject =>
      dispatch(resetPassword(resetPasswordObject)),

    changePasswordIsLoading: select(selectChangePasswordSending),
    changePasswordIsSuccess: select(selectChangePasswordSent),
    changePasswordError: select(selectChangePasswordError),
    changePassword: (userId, currentPassword, newPassword) =>
      dispatch(changePassword(userId, currentPassword, newPassword)),
  };
};

export default useUser;
