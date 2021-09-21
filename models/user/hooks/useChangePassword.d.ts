export default useChangePassword;
declare function useChangePassword(): {
    isLoading: boolean | undefined;
    isSuccess: boolean | undefined;
    userId: string;
    isLoggedIn: boolean;
    error: Error | null | undefined;
    changePassword: (userId: any, currentPassword: any, newPassword: any) => any;
};
