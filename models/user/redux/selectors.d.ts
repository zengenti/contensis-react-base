import { StateType } from "../../config";
import { AppState } from "../../redux/appstate";
export declare const selectUserIsLoading: (state: AppState) => any;
export declare const selectUserIsAuthenticated: (state: AppState) => any;
export declare const selectUserIsAuthenticationError: (state: AppState) => any;
export declare const selectUserIsError: (state: AppState) => any;
/**
 * DEPRECATED 12/2021 - use selectUserErrorMessage instead
 * @param state AppState
 * @returns string
 */
export declare const selectUserAuthenticationErrorMessage: (state: AppState) => any;
export declare const selectUserErrorMessage: (state: AppState) => any;
export declare const selectClientCredentials: (state: AppState, returnType?: StateType | undefined) => any;
export declare const selectUser: (state: AppState, returnType?: StateType | undefined) => any;
export declare const selectUserIsZengentiStaff: (state: AppState) => any;
export declare const selectUserGuid: (state: AppState) => any;
export declare const selectUsername: (state: AppState) => any;
export declare const selectUserEmail: (state: AppState) => any;
export declare const selectUserGroups: (state: AppState, returnType?: StateType | undefined) => any;
export declare const selectUserSecurityToken: (state: AppState) => any;
export declare const selectUserRegistration: (state: AppState, returnType?: StateType | undefined) => any;
export declare const selectUserRegistrationError: (state: AppState) => any;
export declare const selectUserRegistrationIsLoading: (state: AppState) => any;
export declare const selectUserRegistrationIsSuccess: (state: AppState) => any;
export declare const selectPasswordResetRequestSending: (state: AppState) => any;
export declare const selectPasswordResetRequestSent: (state: AppState) => any;
export declare const selectPasswordResetRequestError: (state: AppState) => any;
export declare const selectResetPasswordSending: (state: AppState) => any;
export declare const selectResetPasswordSent: (state: AppState) => any;
export declare const selectResetPasswordError: (state: AppState) => any;
export declare const selectChangePasswordSending: (state: AppState) => any;
export declare const selectChangePasswordSent: (state: AppState) => any;
export declare const selectChangePasswordError: (state: AppState) => any;
