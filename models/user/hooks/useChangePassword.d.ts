export default useChangePassword;
declare function useChangePassword(): {
    isLoading: any;
    isSuccess: any;
    isLoggedIn: any;
    error: any;
    authenticationErrorMessage: any;
    changePassword: (userId: any, currentPassword: any, newPassword: any) => any;
};
