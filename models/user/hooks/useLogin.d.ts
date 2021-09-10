export default useLogin;
declare function useLogin(): {
    loginUser: (username: any, password: any) => any;
    logoutUser: (redirectPath: any) => any;
    authenticationError: any;
    authenticationErrorMessage: unknown;
    error: any;
    errorMessage: unknown;
    isAuthenticated: any;
    isLoading: any;
    user: any;
};
