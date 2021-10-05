export default useChangePassword;
declare function useChangePassword(): {
    isLoading: any;
    isSuccess: any;
    userId: any;
    isLoggedIn: any;
    error: any;
    changePassword: (userId: any, currentPassword: any, newPassword: any) => any;
};
