import { Entry } from 'contensis-delivery-api/lib/models';
import { InitListingAction, SetRouteFiltersOptions, TriggerSearchAction, TriggerSearchParams } from '../models/SearchActions';
import { Mappers } from '../models/Search';
export declare const searchSagas: import("redux-saga/effects").ForkEffect<never>[];
export declare function setRouteFilters(action: InitListingAction | SetRouteFiltersOptions): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<InitListingAction> | import("redux-saga/effects").CallEffect<void>, void, any>;
export declare function doSearch(action: TriggerSearchAction): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    type: string;
    config?: import("../models/Search").Listing | import("../models/Search").SearchFacet | undefined;
    context: string;
    debug?: import("../models/SearchActions").DebugFlags | undefined;
    defaultLang?: string | undefined;
    excludeIds?: string[] | undefined;
    facet: string;
    mapper?: import("../models/Search").SearchResultsMapper<any, Entry> | undefined;
    mappers?: Mappers | undefined;
    params?: {
        [key: string]: string;
    } | undefined;
}> | import("redux-saga/effects").PutEffect<InitListingAction> | import("redux-saga/effects").CallEffect<void>, void, any>;
export declare function triggerMinilistSsr(options: TriggerSearchParams): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
export declare function triggerListingSsr(options: SetRouteFiltersOptions & {
    listingType: string;
}): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
export declare function triggerSearchSsr(options: SetRouteFiltersOptions): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
