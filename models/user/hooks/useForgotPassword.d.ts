export default useForgotPassword;
declare function useForgotPassword(): {
    isLoading: unknown;
    isSuccess: unknown;
    error: unknown;
    requestPasswordReset: (userEmailObject: any) => any;
    setNewPassword: {
        queryString: any;
        isLoading: unknown;
        isSuccess: unknown;
        error: unknown;
        submit: (resetPasswordObject: any) => any;
    };
};
