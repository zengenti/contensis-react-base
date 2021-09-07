import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../redux/actions';
import {
  selectChangePasswordSending,
  selectChangePasswordSent,
  selectChangePasswordError,
  selectUserIsAuthenticated,
  selectUserAuthenticationErrorMessage,
} from '../redux/selectors';

const useChangePassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    isLoading: select(selectChangePasswordSending),
    isSuccess: select(selectChangePasswordSent),
    isLoggedIn: select(selectUserIsAuthenticated),
    error: select(selectChangePasswordError),
    authenticationErrorMessage: select(selectUserAuthenticationErrorMessage),
    changePassword: (userId, currentPassword, newPassword) =>
      dispatch(changePassword(userId, currentPassword, newPassword)),
  };
};

export default useChangePassword;
