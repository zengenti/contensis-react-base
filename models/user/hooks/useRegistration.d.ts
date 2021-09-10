export default useRegistration;
declare function useRegistration(): {
    registerUser: (user: any, mappers: any) => any;
    error: boolean | Error;
    isLoading: boolean;
    isSuccess: boolean;
    user: {};
};
