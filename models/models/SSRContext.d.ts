import { Request, Response } from 'express';
import { Dispatch } from "../../node_modules/redux";
import { CookieHelper } from "../user/util/CookieHelper.class";
import { CachedSearch } from "../util/CachedDeliveryApi";
export type SSRContext = {
    /** SSR only */
    accessMethod?: SSRAccessMethod;
    /** Available in both SSR and client side */
    api: CachedSearch;
    /** Available in both SSR and client side */
    cookies: CookieHelper;
    /** Available in both SSR and client side */
    dispatch: Dispatch<any>;
    /** SSR only */
    request?: Request;
    /** SSR only */
    response?: Response;
    /** Available in both SSR and client side */
    subsitePath?: string;
};
export type SSRAccessMethod = {
    DYNAMIC: boolean;
    REDUX: boolean;
    FRAGMENT: boolean;
    STATIC: boolean;
};
export type SSRAssets = {
    bundleTags?: string;
    htmlAttributes?: string;
    metadata?: string;
    serializedState?: string;
    styleTags?: string;
    title?: string;
};
