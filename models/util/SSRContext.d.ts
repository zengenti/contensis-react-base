/// <reference types="qs" />
import { Request, Response } from 'express';
import React, { PropsWithChildren } from 'react';
import { SSRContext as SSRContextType } from "../models";
/** SSRContextProvider allows us to hold and access request-scoped references
 *  throughout the component tree
 *
 *  adding this in client side allows consumers to write universal code and use
 *  the same helpers and refs as in SSR */
export declare const SSRContextProvider: ({ children, request, response, }: React.PropsWithChildren<{
    request?: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> | undefined;
    response?: Response<any, Record<string, any>> | undefined;
}>) => JSX.Element;
export declare const useSSRContext: () => SSRContextType;
export declare const useDeliveryApi: () => {
    cache: import("./LruCache").LruCache;
    cookies?: import("../user/util/CookieConstants").CookieObject | undefined;
    ssr?: import("./ContensisDeliveryApi").SSRContext | undefined;
    getClient(versionStatus?: import("contensis-core-api").VersionStatus | undefined, project?: string | undefined): import("contensis-delivery-api").Client;
    search(query: import("contensis-core-api").Query, linkDepth?: number, project?: string | undefined): Promise<import("contensis-core-api").PagedList<import("contensis-delivery-api").Entry>>;
    searchUsingPost(query: import("contensis-core-api").Query, linkDepth?: number, project?: string): any;
    get(id: string, linkDepth?: number, versionStatus?: import("contensis-core-api").VersionStatus, project?: string | undefined): Promise<import("contensis-delivery-api").Entry>;
    getContentType(id: string, project?: string | undefined): Promise<import("contensis-core-api").ContentType>;
    getRootNode(options: import("contensis-delivery-api").NodeGetRootOptions, versionStatus?: import("contensis-core-api").VersionStatus, project?: string | undefined): Promise<import("contensis-delivery-api").Node>;
    getNode(options: string | import("contensis-delivery-api").NodeGetByIdOptions | import("contensis-delivery-api").NodeGetByPathOptions, project?: string | undefined): Promise<import("contensis-delivery-api").Node>;
    getAncestors(options: string | import("contensis-delivery-api").Node | import("contensis-delivery-api").NodeGetAncestorsOptions, project?: string | undefined): Promise<import("contensis-delivery-api").Node[]>;
    getChildren(options: string | import("contensis-delivery-api").Node | import("contensis-delivery-api").NodeGetChildrenOptions, project?: string | undefined): Promise<import("contensis-delivery-api").Node[]>;
    getSiblings(options: string | import("contensis-delivery-api").Node | import("contensis-delivery-api").NodeGetSiblingOptions, project?: string | undefined): Promise<import("contensis-delivery-api").Node[]>;
    request<T extends () => Promise<any>>(key: string, execute: T): ReturnType<T>;
};
