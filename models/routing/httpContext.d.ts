/// <reference types="react" />
export type HttpContextValues = {
    statusCode?: number;
    url?: string;
};
export declare const HttpContext: import("react").Context<HttpContextValues>;
export declare const useHttpContext: () => HttpContextValues;
