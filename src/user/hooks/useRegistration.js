import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions';
import {
  selectUserRegistration,
  selectUserRegistrationError,
  selectUserRegistrationIsLoading,
  selectUserRegistrationIsSuccess,
} from '../redux/selectors';

const useRegistration = () => {
  const dispatch = useDispatch();
  const select = useSelector;

  return {
    registerUser: (user, mappers) => dispatch(registerUser(user, mappers)),
    error: select(selectUserRegistrationError),
    isLoading: select(selectUserRegistrationIsLoading),
    isSuccess: select(selectUserRegistrationIsSuccess),
    user: select(selectUserRegistration),
  };
};

export default useRegistration;
