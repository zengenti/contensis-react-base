type Cookies = {
    [k: string]: string;
};
export declare class CookieHelper {
    private cookies;
    private setCookie;
    private removeCookie;
    get raw(): Cookies;
    constructor(cookies: {
        [k: string]: string;
    }, setCookie: CookieHelper['setCookie'], removeCookie: CookieHelper['removeCookie']);
    GetCookie(name: string): string | null;
    SetCookie(name: string, value: string, maxAgeDays?: number): void;
    DeleteCookie(name: string): void;
}
export declare const mapCookieHeader: (cookies: any) => any;
export {};
