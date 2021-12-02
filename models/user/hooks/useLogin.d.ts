export default useLogin;
declare function useLogin(): {
    loginUser: (username: any, password: any) => any;
    logoutUser: (redirectPath: any) => any;
    errorMessage: any;
    isAuthenticated: any;
    isAuthenticationError: any;
    isError: any;
    isLoading: any;
    user: any;
    authenticationError: any;
    authenticationErrorMessage: any;
    error: any;
};
