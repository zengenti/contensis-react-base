import { InitListingAction, SearchParams, SetRouteFiltersOptions, TriggerSearchAction, TriggerSearchParams } from '../models/SearchActions';
import { Mappers } from '../models/Search';
import { Context } from '../models/Enums';
export declare const searchSagas: import("redux-saga/effects").ForkEffect<never>[];
export declare function setRouteFilters(action: InitListingAction | SetRouteFiltersOptions): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<InitListingAction> | import("redux-saga/effects").CallEffect<void>, void, any>;
export declare function doSearch(action: TriggerSearchAction): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<InitListingAction> | import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").PutEffect<{
    type: string;
    config?: import("../models/Search").SearchFacet | import("../models/Search").Listing;
    context: Context | string;
    debug?: import("../models/SearchActions").DebugFlags;
    defaultLang?: string;
    excludeIds?: string[];
    facet: string;
    mapper?: Mappers["results"];
    mappers?: Mappers;
    params?: SearchParams;
    ssr?: import("../..").SSRContext;
}>, void, any>;
export declare function triggerMinilistSsr(options: TriggerSearchParams): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
export declare function triggerListingSsr(options: SetRouteFiltersOptions & {
    listingType: string;
}): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
export declare function triggerSearchSsr(options: SetRouteFiltersOptions): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
