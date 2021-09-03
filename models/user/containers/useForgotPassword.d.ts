export default useForgotPassword;
declare function useForgotPassword(): {
  requestPasswordReset: (
    userEmailObject: any
  ) => {
    type: any;
  };
  error: any;
  isLoading: any;
  isSuccess: any;
};
