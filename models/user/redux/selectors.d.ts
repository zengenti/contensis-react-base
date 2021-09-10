import { AppState } from "../../redux/appstate";
export declare const selectUserIsLoading: (state: AppState) => boolean;
export declare const selectUserIsAuthenticated: (state: AppState) => boolean;
export declare const selectUserAuthenticationError: (state: AppState) => boolean;
export declare const selectUserError: (state: AppState) => boolean;
export declare const selectClientCredentials: (state: AppState) => {
    bearerToken: string;
    bearerTokenExpiryDate: Date;
    refreshToken: string;
    refreshTokenExpiryDate: Date;
    contensisClassicToken: string;
} | null;
export declare const selectUser: (state: AppState) => {
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
export declare const selectUserIsZengentiStaff: (state: AppState) => boolean | undefined;
export declare const selectUserGuid: (state: AppState) => string;
export declare const selectUsername: (state: AppState) => string;
export declare const selectUserEmail: (state: AppState) => string;
export declare const selectUserGroups: (state: AppState) => import("contensis-management-api/lib/models").Group[];
export declare const selectUserSecurityToken: (state: AppState) => string | undefined;
export declare const selectUserRegistration: (state: AppState) => {};
export declare const selectUserRegistrationError: (state: AppState) => false | Error;
export declare const selectUserRegistrationIsLoading: (state: AppState) => boolean;
export declare const selectUserRegistrationIsSuccess: (state: AppState) => boolean;
export declare const selectPasswordResetRequestSending: (state: AppState) => boolean | undefined;
export declare const selectPasswordResetRequestSent: (state: AppState) => boolean | undefined;
export declare const selectPasswordResetRequestError: (state: AppState) => Error | null | undefined;
export declare const selectResetPasswordSending: (state: AppState) => boolean | undefined;
export declare const selectResetPasswordSent: (state: AppState) => boolean | undefined;
export declare const selectResetPasswordError: (state: AppState) => Error | null | undefined;
export declare const selectChangePasswordSending: (state: AppState) => boolean | undefined;
export declare const selectChangePasswordSent: (state: AppState) => boolean | undefined;
export declare const selectChangePasswordError: (state: AppState) => Error | null | undefined;
