import { VersionStatus } from 'contensis-core-api';
import { Client, Query } from 'contensis-delivery-api';
import { INodeOperations, NodeGetRootOptions } from 'contensis-delivery-api/lib/models';
import { DeliveryApi, SSRContext } from './ContensisDeliveryApi';
import { LruCache } from './LruCache';
import { CookieObject } from "../user/util/CookieConstants";
export declare class CachedSearch {
    cache: LruCache;
    cookies?: CookieObject;
    ssr?: SSRContext;
    constructor(ssr?: SSRContext);
    getClient(...args: Parameters<DeliveryApi['getClient']>): Client;
    search(query: Query, linkDepth?: number, project?: string): Promise<any>;
    searchUsingPost(query: Query, linkDepth?: number, project?: string): Promise<any>;
    get(id: string, linkDepth?: number, versionStatus?: VersionStatus, project?: string, fields?: string[]): Promise<any>;
    getContentType(id: string, project?: string): Promise<any>;
    getRootNode(options: NodeGetRootOptions, versionStatus?: VersionStatus, project?: string): Promise<any>;
    getNode(options: Parameters<INodeOperations['get']>[0], project?: string): Promise<any>;
    getAncestors(options: Parameters<INodeOperations['getAncestors']>[0], project?: string): Promise<any>;
    getChildren(options: Parameters<INodeOperations['getChildren']>[0], project?: string): Promise<any>;
    getSiblings(options: Parameters<INodeOperations['getSiblings']>[0], project?: string): Promise<any>;
    request<T extends () => Promise<any>>(key: string, execute: T): Promise<any>;
    /** Use the cached API for fetch requests */
    fetch(uri: RequestInfo, opts?: RequestInit): Promise<any>;
}
export declare const cachedSearch: CachedSearch;
/** Create a cached search instance attached to the current environment
 * SSR context and connected to your environment via global variable
 * `DELIVERY_API_CONFIG`  */
export declare const cachedSearchWithContext: (ssr?: SSRContext) => CachedSearch;
/** @deprecated Use cachedSearchWithContext instead */
export declare const cachedSearchWithCookies: (ssr?: SSRContext) => CachedSearch;
