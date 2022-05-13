export * from "contensis-delivery-api";
export function GetClientSideDeliveryApiStatus(): "published" | "latest" | null;
export function GetDeliveryApiStatusFromHostname(currentHostname: any): "published" | "latest";
export const deliveryApi: DeliveryApi;
export const cachedSearch: CachedSearch;
declare class DeliveryApi {
    search(query: any, linkDepth: any, project: any, env: any): Promise<import("contensis-core-api").PagedList<import("contensis-delivery-api/lib/models").Entry>>;
    getClient(deliveryApiStatus: string | undefined, project: any, env: any): Client;
    getEntry(id: any, linkDepth: number | undefined, deliveryApiStatus: string | undefined, project: any, env: any): Promise<import("contensis-delivery-api/lib/models").Entry>;
}
declare class CachedSearch {
    cache: LruCache;
    taxonomyLookup: {};
    search(query: any, linkDepth: any, project: any, env: any): any;
    getTaxonomyNodeByPath(path: any, project: any, env: any): any;
    request(key: any, execute: any): any;
    extendTaxonomyNode(node: any): any;
    getTaxonomyId(node: any): any;
    fetch(uri: any, opts?: {}): any;
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
