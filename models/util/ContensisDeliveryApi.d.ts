export function getClientConfig(project: any, cookies: any): {
    rootUrl: string;
    accessToken: string;
    projectId: string;
    livePublishingRootUrl: string;
};
export * from "contensis-delivery-api";
export const deliveryApi: DeliveryApi;
export function deliveryApiWithCookies(cookies: any): DeliveryApi;
export const cachedSearch: CachedSearch;
export function cachedSearchWithCookies(cookies: any): CachedSearch;
declare class DeliveryApi {
    constructor(cookies: any);
    cookies: any;
    getClientSideVersionStatus: () => any;
    getServerSideVersionStatus: (request: any) => any;
    getVersionStatusFromHeaders: (headers: any) => any;
    getVersionStatusFromHostname: (currentHostname: any) => "published" | "latest";
    search: (query: any, linkDepth: any, project: any) => Promise<import("contensis-core-api").PagedList<import("contensis-delivery-api/lib/models").Entry>>;
    getClient: (deliveryApiStatus: string | undefined, project: any) => Client;
    getEntry: (id: any, linkDepth: number | undefined, deliveryApiStatus: string | undefined, project: any) => Promise<import("contensis-delivery-api/lib/models").Entry>;
}
declare class CachedSearch {
    constructor(cookies: any);
    cache: LruCache;
    cookies: any;
    taxonomyLookup: {};
    getClient: (deliveryApiStatus: string | undefined, project: any) => Client;
    search(query: any, linkDepth: any, project: any): any;
    searchUsingPost(query: any, linkDepth?: number, project?: string): any;
    get(id: any, linkDepth: any, versionStatus: any, project: any): any;
    getContentType(id: any, project: any): any;
    getTaxonomyNode(key: any, project: any): any;
    getRootNode(options: any, project: any): any;
    getNode(options: any, project: any): any;
    getAncestors(options: any, project: any): any;
    getChildren(options: any, project: any): any;
    getSiblings(options: any, project: any): any;
    request(key: any, execute: any): any;
}
import { Client } from "contensis-delivery-api";
declare class LruCache {
    constructor(limit?: number);
    map: {};
    head: any;
    tail: any;
    limit: number;
    size: number;
    get(key: any): any;
    set(key: any, value: any): void;
    setHead(node: any): void;
    remove(key: any): void;
}
