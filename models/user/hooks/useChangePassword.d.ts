export default useChangePassword;
declare function useChangePassword(): {
    isLoading: unknown;
    isSuccess: unknown;
    isLoggedIn: any;
    error: unknown;
    authenticationErrorMessage: unknown;
    changePassword: (userId: any, currentPassword: any, newPassword: any) => any;
};
