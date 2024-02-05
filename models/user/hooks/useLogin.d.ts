declare const useLogin: () => {
    loginUser: (username: string, password: string) => any;
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
export default useLogin;
