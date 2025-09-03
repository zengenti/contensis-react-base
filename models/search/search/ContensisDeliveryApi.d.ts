/** @deprecated Taxonomy is deprecated in Contensis, code remains
 * to support any legacy implementations using Taxonomy in their search */
export const cachedTaxonomyLookup: CachedTaxonomyLookup;
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
