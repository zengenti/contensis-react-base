import { CookieHelper } from '../util/CookieHelper.class';
/** Credentials are optional: a site on `USE_IDP` signs the member in at
 *  `/idp/check` and has nothing to pass, so `loginUser()` is the whole call.
 *  Classic sites carry on passing them. */
export declare const loginUser: (username?: string, password?: string, cookies?: CookieHelper) => any;
export declare const logoutUser: (redirectPath?: string, cookies?: CookieHelper) => any;
export declare const registerUser: (user: any, mappers: any) => any;
export declare const requestPasswordReset: (userEmailObject: any) => any;
export declare const resetPassword: (resetPasswordObject: any) => any;
export declare const changePassword: (userId: any, currentPassword: any, newPassword: any) => any;
