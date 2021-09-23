import { AppState } from '../models/SearchState';
import { InitListingAction, TriggerSearchAction } from '../models/SearchActions';
import { Mappers } from '../models/Search';
import { Context } from '../models/Enums';
export declare const searchSagas: import("redux-saga/effects").ForkEffect<never>[];
export declare function setRouteFilters(action: InitListingAction): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<InitListingAction> | import("redux-saga/effects").CallEffect<void>, void, any>;
export declare function doSearch(action: TriggerSearchAction): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    type: string;
    config?: import("../models/Search").Listing | import("../models/Search").Facet | undefined;
    context: Context;
    debug?: import("../models/SearchActions").DebugFlags | undefined;
    defaultLang?: string | undefined;
    excludeIds?: string[] | undefined;
    facet: string;
    mapper?: ((entries: any[], facet?: string | undefined, context?: Context | undefined, state?: AppState | undefined) => any[]) | undefined;
    mappers?: Mappers | undefined;
    params?: {
        [key: string]: string;
    } | undefined;
}> | import("redux-saga/effects").PutEffect<InitListingAction> | import("redux-saga/effects").CallEffect<void>, void, any>;
