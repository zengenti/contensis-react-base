export default useForgotPassword;
declare function useForgotPassword(): {
    isLoading: any;
    isSuccess: any;
    error: any;
    requestPasswordReset: (userEmailObject: any) => any;
};
