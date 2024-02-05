import FallbackCookies from 'universal-cookie';
type Cookies = {
    [k: string]: string;
};
export declare class CookieHelper {
    private cookies;
    private set?;
    private remove?;
    private fallback;
    get raw(): Cookies;
    get cookie(): FallbackCookies;
    constructor(cookies?: {
        [k: string]: string;
    }, setCookie?: CookieHelper['set'], removeCookie?: CookieHelper['remove']);
    GetCookie(name: string): string | null;
    SetCookie(name: string, value: string, maxAgeDays?: number): void;
    DeleteCookie(name: string): void;
}
export declare const mapCookieHeader: (cookies: any) => any;
export {};
