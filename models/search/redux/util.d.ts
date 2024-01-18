import { SearchQueryOptions } from '../models/Queries';
import { AppState } from '../models/SearchState';
import { EnsureSearchAction, SetSearchEntriesAction } from '../models/SearchActions';
/**
 * 1, Generates all the parameters required to run the search query.
 * 2, Tells us if we should run the search.
 * @param {object} action
 * @param {AppState} state
 * @returns [queryParams, runSearch]
 */
export declare const generateQueryParams: (action: EnsureSearchAction | SetSearchEntriesAction, state: AppState) => [SearchQueryOptions, boolean];
/**
 * Checks if we have already loaded everything we're asking for and tells us to run the search or not
 * @param action
 * @param state
 */
export declare const runSearch: (action: EnsureSearchAction | SetSearchEntriesAction, state: AppState, queryParams: SearchQueryOptions) => boolean;
/**
 * This will tell us if filter parameters have been
 * changed by some external event such as a route change
 * @param action
 * @returns true or false
 */
export declare const filterParamsChanged: (action: EnsureSearchAction | SetSearchEntriesAction, state?: AppState) => boolean;
export declare const debugExecuteSearch: (action: EnsureSearchAction | SetSearchEntriesAction, state: AppState) => void;
export declare const scrollTo: (scrollToElement: string) => void;
