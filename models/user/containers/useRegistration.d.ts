export default useLogin;
declare function useLogin(): {
    registerUser: (user: any, mappers: any) => any;
    error: any;
    isLoading: any;
    isSuccess: any;
    user: any;
};
