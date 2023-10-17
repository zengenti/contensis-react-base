import { FilterExpression, SearchQueryOptions } from '~/search';
import { Query } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api/lib/models';
import { LinkDepthApiFilters } from './api.d';
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type SearchQueryArgs = WithOptional<SearchQueryOptions & {
    idFilters?: SearchQueryOptions['filters'];
    sharedFilters?: SearchQueryOptions['filters'];
}, 'assetTypes' | 'customWhere' | 'dynamicOrderBy' | 'excludeIds' | 'featuredResults' | 'fields' | 'includeInSearchFields' | 'languages' | 'omitDefaultSearchFields' | 'orderBy' | 'pageIndex' | 'searchTerm' | 'webpageTemplates' | 'weightedSearchFields'>;
/**
 * Builds our complete Delivery API Query object from a set of provided arguments
 * @param queryParams
 * @returns Delivery API Query
 */
export declare const searchQuery: ({ assetTypes, contentTypeIds, customWhere, fields, filters, idFilters, sharedFilters, pageSize, pageIndex, orderBy, searchTerm, versionStatus, webpageTemplates, weightedSearchFields, }: SearchQueryArgs) => Query;
export declare const appendSearchQueryFilters: (query: Query, idFilters: FilterExpression[]) => void;
export declare const finalQuery: ({ assetTypes, contentTypeIds, fields, filters, idFilters, sharedFilters, pageSize, pageIndex, orderBy, searchTerm, versionStatus, webpageTemplates, weightedSearchFields, }: SearchQueryArgs, children: Omit<SearchQueryArgs, 'pageSize' | 'pageIndex' | 'versionStatus'>[]) => Query;
/**
 * Create a filter expression from a provided filters configuration object
 * and populate them based on the presence of that key in params, filter
 * out any filter keys that do not have a value set in params
 * @param f filters configuration from any level
 * @param params request.query object from Express middleware
 * @returns FilterExpression[] we can use to use with searchQuery function
 */
export declare const makeFilterExpressions: (f: LinkDepthApiFilters, params: {
    [param: string]: string | undefined;
}) => FilterExpression[];
export declare const makeDerivedIdsFilterExpression: (prevFieldId: string, entries: Entry[], ownIds?: boolean, alwaysApplyFilter?: boolean) => FilterExpression[];
export declare const resolveParentEntries: (parentContentTypeIds: string[], replaceContentTypeIds: string[], parentFieldId: string, results: Entry[], params: any, debug: boolean) => Promise<Entry[]>;
export {};
