import type { AppRoutes } from "../models";
export declare const deparameterise: (path: string) => string;
/** Create static routes for routes with specified locales */
export declare const createLocaleRoutes: (routes: AppRoutes) => {
    [originalPath: string]: {
        [locale: string]: string;
    };
};
