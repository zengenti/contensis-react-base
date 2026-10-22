declare const useLogin: () => {
    loginUser: (username?: string, password?: string) => any;
    logoutUser: (redirectPath?: string) => any;
    errorMessage: any;
    isAuthenticated: any;
    isAuthenticationError: any;
    isError: any;
    isLoading: any;
    user: any;
    loginMethod: import("../idp").LoginMethod;
    authenticationError: any;
    authenticationErrorMessage: any;
    error: any;
};
export default useLogin;
