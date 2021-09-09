import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../redux/actions';
import {
  selectChangePasswordSending,
  selectChangePasswordSent,
  selectChangePasswordError,
  selectUserIsAuthenticated,
  selectUserGuid,
} from '../redux/selectors';

const useChangePassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    isLoading: select(selectChangePasswordSending),
    isSuccess: select(selectChangePasswordSent),
    userId: select(selectUserGuid),
    isLoggedIn: select(selectUserIsAuthenticated),
    error: select(selectChangePasswordError),
    changePassword: (userId, currentPassword, newPassword) =>
      dispatch(changePassword(userId, currentPassword, newPassword)),
  };
};

export default useChangePassword;
