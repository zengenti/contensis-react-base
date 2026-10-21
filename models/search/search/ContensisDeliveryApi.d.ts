/** @deprecated Classic Contensis feature — modern Contensis uses tags and linked entries. */
export const cachedTaxonomyLookup: CachedTaxonomyLookup;
/** @deprecated Classic Contensis feature — modern Contensis uses tags and linked entries. */
declare class CachedTaxonomyLookup {
    cache: LruCache;
    taxonomyLookup: {};
    getTaxonomyNodeByPath(path: any, project: any, env: any): any;
    request(key: any, execute: any): any;
    extendTaxonomyNode(node: any): any;
    getTaxonomyId(node: any): any;
}
import { LruCache } from "../../util/LruCache";
export {};
