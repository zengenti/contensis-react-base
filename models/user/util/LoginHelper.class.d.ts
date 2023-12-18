export class LoginHelper {
    static CMS_URL: string;
    static WSFED_LOGIN: boolean;
    static LOGIN_ROUTE: string;
    static ACCESS_DENIED_ROUTE: string;
    static IS_TWO_FA: any;
    static SetLoginCookies({ contensisClassicToken, refreshToken }: {
        contensisClassicToken: any;
        refreshToken: any;
    }): void;
    static GetCachedCredentials(): {
        bearerToken: null;
        bearerTokenExpiryDate: null;
        refreshToken: string | null;
        refreshTokenExpiryDate: null;
        contensisClassicToken: string | null;
    };
    static ClearCachedCredentials(): void;
    static RequestTwoFaAuthToken: (username: any) => Promise<(Error | Response | null | undefined)[]>;
    static VerifyTwoFaAuthToken: (username: any, token: any) => Promise<any[]>;
    static LoginUserTwoFactorAuth({ username, password, clientCredentials, userIn, twoFaToken, }: {
        username: any;
        password: any;
        clientCredentials: any;
        userIn: any;
        twoFaToken: any;
    }): Promise<{
        authenticationState: {
            clientCredentials: null;
            isAuthenticated: boolean;
            isAuthenticationError: boolean;
            isError: boolean;
        };
        user: any;
    }>;
    static LoginUserRegular({ username, password, clientCredentials }: {
        username: any;
        password: any;
        clientCredentials: any;
    }): Promise<{
        authenticationState: {
            clientCredentials: null;
            isAuthenticated: boolean;
            isAuthenticationError: boolean;
            isError: boolean;
        };
        user: Error | {
            groups: any;
        } | null | undefined;
    }>;
    static LoginUser({ username, password, clientCredentials, userIn, twoFaToken, }: {
        username: any;
        password: any;
        clientCredentials: any;
        userIn: any;
        twoFaToken: any;
    }): Promise<{
        authenticationState: {
            clientCredentials: null;
            isAuthenticated: boolean;
            isAuthenticationError: boolean;
            isError: boolean;
        };
        user: any;
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
    static RemoveSecurityTokenQuery(): void;
    static WsFedLogout(redirectPath: any): Promise<void>;
    static GetCredentialsForSecurityToken(securityToken: any): Promise<undefined[] | Error[] | {
        message: string;
    }[] | {
        message: string;
        data: any;
    }[]>;
}
