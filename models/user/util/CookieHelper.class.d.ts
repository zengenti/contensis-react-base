export declare class CookieHelper {
    static GetCookie(name: any): string | null;
    static SetCookie(name: any, value: any, maxAgeDays?: number): void;
    static DeleteCookie(name: any): void;
}
