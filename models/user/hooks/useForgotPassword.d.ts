export default useForgotPassword;
declare function useForgotPassword(): {
    isLoading: boolean | undefined;
    isSuccess: boolean | undefined;
    error: Error | null | undefined;
    requestPasswordReset: (userEmailObject: any) => any;
    setNewPassword: {
        queryString: any;
        isLoading: boolean | undefined;
        isSuccess: boolean | undefined;
        error: Error | null | undefined;
        submit: (resetPasswordObject: any) => any;
    };
};
