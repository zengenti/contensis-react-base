export * from "contensis-delivery-api";
export const deliveryApi: DeliveryApi;
export const cachedSearch: CachedSearch;
declare class DeliveryApi {
    getClientSideVersionStatus: () => "published" | "latest" | null;
    getVersionStatusFromHostname: (currentHostname: any) => "published" | "latest";
    search: (query: any, linkDepth: any, project: any, env: any) => Promise<import("contensis-core-api").PagedList<import("contensis-delivery-api/lib/models").Entry>>;
    getClient: (deliveryApiStatus: string | undefined, project: any, env: any) => Client;
    getEntry: (id: any, linkDepth: number | undefined, deliveryApiStatus: string | undefined, project: any, env: any) => Promise<import("contensis-delivery-api/lib/models").Entry>;
}
declare class CachedSearch {
    cache: LruCache;
    taxonomyLookup: {};
    search(query: any, linkDepth: any, project: any, env: any): any;
    searchUsingPost(query: any, linkDepth: number | undefined, project: string | undefined, env: any): any;
    get(id: any, linkDepth: any, versionStatus: any, project: any, env: any): any;
    getContentType(id: any, project: any, env: any): any;
    getTaxonomyNode(key: any, project: any, env: any): any;
    getRootNode(options: any, project: any, env: any): any;
    getNode(options: any, project: any, env: any): any;
    getAncestors(options: any, project: any, env: any): any;
    getChildren(options: any, project: any, env: any): any;
    getSiblings(options: any, project: any, env: any): any;
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
