/**
 * Map order is the LRU policy: re-insert on read, evict the first key. A linked list
 * kept beside the lookup map could desync from it, and removals then crashed.
 */
export class LruCache {
    constructor(limit?: number);
    map: Map<any, any>;
    limit: number;
    get size(): number;
    get(key: any): any;
    set(key: any, value: any): void;
    remove(key: any): void;
}
