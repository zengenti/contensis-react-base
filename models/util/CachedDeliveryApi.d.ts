import { VersionStatus } from 'contensis-core-api';
import { Client, Query } from 'contensis-delivery-api';
import { INodeOperations, NodeGetRootOptions } from 'contensis-delivery-api/lib/models';
import { DeliveryApi, SSRContext } from './ContensisDeliveryApi';
import { LruCache } from './LruCache';
import { CookieObject } from "../user/util/CookieConstants";
declare class CachedSearch {
    cache: LruCache;
    cookies?: CookieObject;
    ssr?: SSRContext;
    constructor(ssr?: SSRContext);
    getClient(...args: Parameters<DeliveryApi['getClient']>): Client;
    search(query: Query, linkDepth?: number, project?: string): Promise<import("contensis-core-api").PagedList<import("contensis-delivery-api").Entry>>;
    searchUsingPost(query: Query, linkDepth?: number, project?: string): any;
    get(id: string, linkDepth?: number, versionStatus?: VersionStatus, project?: string, fields?: string[]): Promise<import("contensis-delivery-api").Entry>;
    getContentType(id: string, project?: string): Promise<import("contensis-core-api").ContentType>;
    getRootNode(options: NodeGetRootOptions, versionStatus?: VersionStatus, project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>>;
    getNode(options: Parameters<INodeOperations['get']>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>>;
    getAncestors(options: Parameters<INodeOperations['getAncestors']>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>[]>;
    getChildren(options: Parameters<INodeOperations['getChildren']>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>[]>;
    getSiblings(options: Parameters<INodeOperations['getSiblings']>[0], project?: string): Promise<import("contensis-delivery-api").Node<import("contensis-delivery-api").Entry>[]>;
    request<T extends () => Promise<any>>(key: string, execute: T): ReturnType<T>;
}
export declare const cachedSearch: CachedSearch;
export declare const cachedSearchWithCookies: (ssr?: SSRContext) => CachedSearch;
export {};
