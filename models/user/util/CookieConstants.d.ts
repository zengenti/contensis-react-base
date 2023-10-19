export declare const LOGIN_COOKIE = "ContensisCMSUserName";
export declare const REFRESH_TOKEN_COOKIE = "RefreshToken";
export declare const findLoginCookies: (cookies: string | {
    [name: string]: any;
}) => string | {
    [k: string]: any;
};
