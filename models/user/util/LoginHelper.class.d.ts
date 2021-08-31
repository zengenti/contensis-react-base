export const LOGIN_COOKIE: "ContensisCMSUserName";
export const REFRESH_TOKEN_COOKIE: "RefreshToken";
export class LoginHelper {
    static CMS_URL: any;
    static WSFED_LOGIN: boolean;
    static LOGIN_ROUTE: string;
    static ACCESS_DENIED_ROUTE: string;
    static SetLoginCookies({ contensisClassicToken, refreshToken }: {
        contensisClassicToken: any;
        refreshToken: any;
    }): void;
    static GetCachedCredentials(): {
        bearerToken: null;
        bearerTokenExpiryDate: null;
        refreshToken: any;
        refreshTokenExpiryDate: null;
        contensisClassicToken: any;
    };
    static ClearCachedCredentials(): void;
    static LoginUser({ username, password, clientCredentials }: {
        username: any;
        password: any;
        clientCredentials: any;
    }): Promise<{
        authenticationState: {
            authenticated: boolean;
            authenticationError: boolean;
            error: boolean;
            clientCredentials: null;
        };
        user: Error | {
            groups: any;
        } | null | undefined;
    }>;
    static GetUserDetails: (client: any) => Promise<(Error | {
        groups: any;
    } | null)[]>;
    static LogoutUser(redirectPath: any): void;
    static ClientRedirectToHome(location: any): void;
    static ClientRedirectToSignInPage(redirectPath: any): Promise<void>;
    static ClientRedirectToAccessDeniedPage(originalPath: any): void;
    static ClientRedirectToPath(redirectPath: any): void;
    static WsFedLogin(redirectUri: any): Promise<void>;
    static WsFedLogout(redirectPath: any): Promise<void>;
    static GetCredentialsForSecurityToken(securityToken: any): Promise<undefined[] | Error[] | {
        message: string;
    }[] | {
        message: string;
        data: any;
    }[]>;
    static isZengentiStaff(email: any): boolean;
}
