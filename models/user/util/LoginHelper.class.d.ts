import { ManagementApiClientCredentials } from './ContensisManagementApi';
import { AuthenticationState, UserWithGroups } from '../state';
import { Client } from 'contensis-management-api';
import { CookieHelper } from './CookieHelper.class';
export declare class LoginHelper {
    static CMS_URL: string;
    static WSFED_LOGIN: boolean;
    static LOGIN_ROUTE: string;
    static ACCESS_DENIED_ROUTE: string;
    cookies: CookieHelper;
    constructor(cookies?: CookieHelper);
    static withCookies: (cookieHelper: CookieHelper) => LoginHelper;
    static GetUserDetails: (client: Client) => Promise<[Error | null, UserWithGroups | undefined]>;
    static ClientRedirectToHome(location?: Location): void;
    static ClientRedirectToSignInPage(redirectPath?: string): Promise<void>;
    static GetAccessDeniedRoute(originalPath: any): string;
    static ClientRedirectToAccessDeniedPage(originalPath: any): void;
    static ClientRedirectToPath(redirectPath: any): void;
    static WsFedLogin(redirectUri?: string): Promise<void>;
    static RemoveSecurityTokenQuery(): void;
    static WsFedLogout(redirectPath?: string): Promise<void>;
    static GetCredentialsForSecurityToken(securityToken: string): Promise<any[]>;
    SetLoginCookies({ bearerToken, contensisClassicToken, refreshToken, }: ManagementApiClientCredentials): void;
    GetCachedCredentials(): {
        bearerToken: null;
        bearerTokenExpiryDate: null;
        refreshToken: string | null;
        refreshTokenExpiryDate: null;
        contensisClassicToken: string | null;
        securityToken: null;
    };
    ClearCachedCredentials(): void;
    LoginUser({ username, password, clientCredentials, }: {
        username?: string;
        password?: string;
        clientCredentials?: ManagementApiClientCredentials;
    }): Promise<{
        authenticationState: AuthenticationState;
        user: any;
    }>;
    LogoutUser(redirectPath?: string): void;
}
