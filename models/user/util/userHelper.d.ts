export class UserHelper {
    static GetUsersEnvironments(securityToken: any): Promise<any>;
    static ResendUserVerification(userEmail: any): Promise<any>;
    static RequestPasswordReset(userEmailObject: any): Promise<any>;
    static ResetPassword(resetPasswordObject: any): Promise<any>;
    static get(url: any, options?: {
        method: string;
        headers: {
            'Content-Type': string;
        };
    }): Promise<any>;
}
