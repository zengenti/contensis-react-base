export class LoginHelper {
    static CMS_URL: string;
    static WSFED_LOGIN: boolean;
    static LOGIN_ROUTE: string;
    static ACCESS_DENIED_ROUTE: string;
    static withCookies: (cookieHelper: any) => LoginHelper;
    static GetUserDetails: (client: any) => Promise<(Error | {
        groups: any;
    } | null)[]>;
    static ClientRedirectToHome(location: any): void;
    static ClientRedirectToSignInPage(redirectPath: any): Promise<void>;
    static GetAccessDeniedRoute(originalPath: any): string;
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
    constructor(cookies: any);
    cookies: any;
    SetLoginCookies({ contensisClassicToken, refreshToken }: {
        contensisClassicToken: any;
        refreshToken: any;
    }): void;
    GetCachedCredentials(): {
        bearerToken: null;
        bearerTokenExpiryDate: null;
        refreshToken: any;
        refreshTokenExpiryDate: null;
        contensisClassicToken: any;
    };
    ClearCachedCredentials(): void;
    LoginUser({ username, password, clientCredentials }: {
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
    LogoutUser(redirectPath: any): void;
}
