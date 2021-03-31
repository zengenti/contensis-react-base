import {
  useLogin,
  useRegistration,
  useForgotPassword,
  useResetPassword,
} from '-/src/lib/user';

const useUser = () => {
  return {
    ...useLogin(),
    ...useRegistration(),
    ...useForgotPassword(),
    ...useResetPassword(),
  };
};

export default useUser;
