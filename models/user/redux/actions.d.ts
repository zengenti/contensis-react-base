import { CookieHelper } from '../util/CookieHelper.class';
export declare const loginUser: (username: string, password: string, cookies?: CookieHelper) => any;
export declare const logoutUser: (redirectPath?: string, cookies?: CookieHelper) => any;
export declare const registerUser: (user: any, mappers: any) => any;
export declare const requestPasswordReset: (userEmailObject: any) => any;
export declare const resetPassword: (resetPasswordObject: any) => any;
export declare const changePassword: (userId: any, currentPassword: any, newPassword: any) => any;
