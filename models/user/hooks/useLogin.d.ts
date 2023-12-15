export default useLogin;
declare function useLogin(): {
    loginUser: (username: any, password: any) => any;
    verifyTwoFa: (twoFaToken: any) => any;
    logoutUser: (redirectPath: any) => any;
    errorMessage: any;
    requiresTwoFa: any;
    isAuthenticated: any;
    isAuthenticationError: any;
    isError: any;
    isLoading: any;
    user: any;
    authenticationError: any;
    authenticationErrorMessage: any;
    error: any;
};
