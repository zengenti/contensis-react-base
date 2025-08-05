import { Request, Response } from 'express';
import React, { PropsWithChildren } from 'react';
import { SSRAccessMethod, SSRAssets, SSRContext as SSRContextType } from "../models";
/**
 * SSRContextProvider allows us to hold and access request-scoped references
 * throughout the component tree
 *
 * adding this in client side allows consumers to write universal code and use
 * the same helpers and request-scoped refs for api, cookies and redux dispatcher
 * as in SSR */
export declare const SSRContextProvider: ({ accessMethod, children, request, response, ssrAssets, }: PropsWithChildren<{
    accessMethod?: SSRAccessMethod;
    request?: Request;
    response?: Response;
    ssrAssets?: SSRAssets;
}>) => React.JSX.Element;
/**
 * Server side usage provides access to request-scoped references throughout the component tree
 *
 * Client side usage allows consumers to write universal code, using the same
 * helpers and request-scoped refs for api, cookies and redux dispatcher as in SSR
 * @returns SSRContextType
 */
export declare const useSSRContext: () => SSRContextType;
export declare const useDeliveryApi: () => {
    cache: import("./LruCache").LruCache;
    cookies?: import("../user/util/CookieConstants").CookieObject;
    ssr?: import("./ContensisDeliveryApi").SSRContext;
    getClient(versionStatus?: import("contensis-core-api").VersionStatus | undefined, project?: string | undefined): import("contensis-delivery-api").Client;
    search(query: import("contensis-core-api").Query, linkDepth?: number, project?: string): Promise<import("contensis-core-api").PagedSearchList<import("contensis-delivery-api").Entry>>;
    searchUsingPost(query: import("contensis-core-api").Query, linkDepth?: number, project?: string): any;
    get(id: string, linkDepth?: number, versionStatus?: import("contensis-core-api").VersionStatus, project?: string, fields?: string[]): Promise<import("contensis-delivery-api").Entry>;
    getContentType(id: string, project?: string): Promise<import("contensis-core-api").ContentType>;
    getRootNode(options: import("contensis-delivery-api").NodeGetRootOptions, versionStatus?: import("contensis-core-api").VersionStatus, project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>>;
    getNode(options: Parameters<import("contensis-delivery-api").INodeOperations["get"]>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>>;
    getAncestors(options: Parameters<import("contensis-delivery-api").INodeOperations["getAncestors"]>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>[]>;
    getChildren(options: Parameters<import("contensis-delivery-api").INodeOperations["getChildren"]>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>[]>;
    getSiblings(options: Parameters<import("contensis-delivery-api").INodeOperations["getSiblings"]>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>[]>;
    request<T extends () => Promise<any>>(key: string, execute: T): ReturnType<T>;
};
