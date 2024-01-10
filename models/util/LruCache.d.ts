export class LruCache {
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
