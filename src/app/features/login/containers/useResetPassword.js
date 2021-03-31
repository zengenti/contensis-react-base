import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentSearch } from '~/core/redux/selectors/routing';
import { resetPassword } from '../redux/actions';
import {
  selectResetPasswordSending,
  selectResetPasswordSent,
  selectResetPasswordError,
} from '../redux/selectors';

const useResetPassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    queryString: select(selectCurrentSearch),
    isLoading: select(selectResetPasswordSending),
    isSuccess: select(selectResetPasswordSent),
    error: select(selectResetPasswordError),
    resetPassword: resetPasswordObject =>
      dispatch(resetPassword(resetPasswordObject)),
  };
};

export default useResetPassword;
