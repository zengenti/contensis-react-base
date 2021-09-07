import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset, resetPassword } from '../redux/actions';
import {
  selectPasswordResetRequestError,
  selectPasswordResetRequestSending,
  selectPasswordResetRequestSent,
  selectResetPasswordSending,
  selectResetPasswordSent,
  selectResetPasswordError,
} from '../redux/selectors';
import { selectCurrentSearch } from '~/routing/redux/selectors';

const useForgotPassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    isLoading: select(selectPasswordResetRequestSending),
    isSuccess: select(selectPasswordResetRequestSent),
    error: select(selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject =>
      dispatch(requestPasswordReset(userEmailObject)),

    setNewPassword: {
      queryString: select(selectCurrentSearch),
      isLoading: select(selectResetPasswordSending),
      isSuccess: select(selectResetPasswordSent),
      error: select(selectResetPasswordError),
      submit: resetPasswordObject =>
        dispatch(resetPassword(resetPasswordObject)),
    },
  };
};

export default useForgotPassword;
