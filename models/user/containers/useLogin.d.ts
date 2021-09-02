export default useLogin;
declare function useLogin(): {
    loginUser: (username: any, password: any) => {
        type: any;
    };
    logoutUser: (redirectPath: any) => {
        type: any;
    };
    authenticationError: any;
    error: any;
    isAuthenticated: any;
    isLoading: any;
    user: any;
};
