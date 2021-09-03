import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../redux/actions';
import {
  selectPasswordResetRequestError,
  selectPasswordResetRequestSending,
  selectPasswordResetRequestSent,
} from '../redux/selectors';

const useForgotPassword = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    isLoading: select(selectPasswordResetRequestSending),
    isSuccess: select(selectPasswordResetRequestSent),
    error: select(selectPasswordResetRequestError),
    requestPasswordReset: userEmailObject =>
      dispatch(requestPasswordReset(userEmailObject)),
  };
};

export default useForgotPassword;
