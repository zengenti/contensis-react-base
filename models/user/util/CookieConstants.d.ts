export declare const BEARER_TOKEN_COOKIE = "ContensisSecurityBearerToken";
export declare const LOGIN_COOKIE = "ContensisCMSUserName";
export declare const REFRESH_TOKEN_COOKIE = "RefreshToken";
export type CookieObject = {
    [name: string]: any;
};
export declare const findLoginCookies: (cookies: CookieObject | string) => string | {
    [k: string]: any;
};
