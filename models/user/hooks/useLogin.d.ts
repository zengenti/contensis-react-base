export default useLogin;
declare function useLogin(): {
    loginUser: (username: any, password: any) => any;
    logoutUser: (redirectPath: any) => any;
    authenticationError: boolean;
    authenticationErrorMessage: string | null;
    error: boolean;
    errorMessage: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        authenticationState: {
            authenticated: boolean;
            authenticationError: boolean;
            authenticationErrorMessage: string | null;
            clientCredentials: {
                bearerToken: string;
                bearerTokenExpiryDate: Date;
                refreshToken: string;
                refreshTokenExpiryDate: Date;
                contensisClassicToken: string;
            } | null;
            error: boolean;
            errorMessage: string | null;
            loading: boolean;
        };
        groups: import("contensis-management-api/lib/models").Group[];
        isZengentiStaff?: boolean | undefined;
        registration?: {
            error: Error | null;
            loading: boolean;
            success: boolean;
        } | undefined;
        passwordResetRequest?: {
            isSending: boolean;
            sent: boolean;
            error: Error | null;
        } | undefined;
        resetPassword?: {
            isSending: boolean;
            sent: boolean;
            error: Error | null;
        } | undefined;
        changePassword?: {
            isSending: boolean;
            sent: boolean;
            error: Error | null;
        } | undefined;
    } & import("contensis-management-api/lib/models").User;
};
