export default useUser;
declare function useUser(): {
  loginUser: (
    username: any,
    password: any
  ) => {
    type: any;
  };
  logoutUser: (
    redirectPath: any
  ) => {
    type: any;
  };
  registerUser: (
    user: any,
    mappers: any
  ) => {
    type: any;
  };
  requestPasswordReset: (
    userEmailObject: any
  ) => {
    type: any;
  };
  resetPassword: (
    resetPasswordObject: any
  ) => {
    type: any;
  };
  changePassword: (
    userId: any,
    currentPassword: any,
    newPassword: any
  ) => {
    type: any;
  };

  error: any;
  isLoading: any;
  isSuccess: any;
};
