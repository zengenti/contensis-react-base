import { PagedList } from 'contensis-core-api';
import { Entry, TaxonomyNode } from 'contensis-delivery-api/lib/models';
import { Context } from '../models/Enums';
import { SearchFacet, Listing, Mappers, SearchConfig } from '../models/Search';
import { AppState, Facet, Filter } from './SearchState';
import { QueryParams } from './Queries';
import { TimedSearchResponse } from './SearchUtil';
import { SSRContext } from '~/models';

/**
 * Parameters for the current search
 * usually provided by route, path or query parameters or
 * can be overridden manually to manipulate the search to
 * drive certain conditions when required
 */
export type SearchParams = { [key: string]: string };

type Action = {
  type: string;
};
export type WithMappers<T> = T & { mappers: Mappers };

export type DebugFlags =
  | boolean
  | { executeSearch?: boolean; preloadOtherFacets?: boolean };

export type TriggerSearchParams = {
  config?: SearchFacet | Listing;
  context: Context | string;
  debug?: DebugFlags;
  defaultLang?: string;
  excludeIds?: string[];
  facet: string;
  mapper?: Mappers['results'];
  mappers?: Mappers;
  params?: SearchParams;
  ssr?: SSRContext;
};

export type TriggerSearchAction = Action & TriggerSearchParams;

export type TriggerSearchActionCreator = (
  p: TriggerSearchParams
) => TriggerSearchAction;

type InitListingParams = {
  context: Context;
  debug?: DebugFlags;
  defaultLang?: string;
  /**
   * Triggers the loading of the search config facet
   */
  facet: string;
  /**
   * Triggers the loading of the search config listing
   */
  listingType?: string;
  mapper?: Mappers['results'];
  mappers?: Mappers;
  params: SearchParams;
  preload?: boolean;
  ssr?: SSRContext;
};

export type InitListingAction = Action &
  InitListingParams & { isSSR?: boolean };

export type SetRouteFiltersOptions = Omit<Partial<InitListingAction>, 'type'>;

export type SearchRouteOptions = Omit<
  SetRouteFiltersOptions & {
    /**
     * The search configuration to use for the search
     */
    config?: SearchConfig;
  },
  'ssr' | 'isSSR'
>;

export type InitListingActionCreator = (
  p: InitListingParams
) => InitListingAction;

export type LoadFiltersSearchResults = Action & {
  error: any;
  facetKey: string;
  filterKey: string;
  payload: TaxonomyNode | PagedList<Entry>;
  selectedKeys: string[];
  context: Context;
  mapper: Mappers['filterItems'];
  facet: Facet;
};

export type SearchResults = {
  action: ExecuteSearchAction;
  featuredResult?: TimedSearchResponse;
  pageIndex: number;
  prevResults: any[];
  result: TimedSearchResponse;
  state: AppState;
};

export type LoadFilterAction = {
  facetKey: string;
  filterKey: string;
  filter: Filter;
  projectId: string;
  selectedKeys: string[];
  context: Context;
  mapper: Mappers['filterItems'];
  ssr?: SSRContext;
};

export type LoadFiltersCompleteAction = Action & {
  error: any;
  facetKey: string;
  filterKey: string;
  payload: TaxonomyNode | PagedList<Entry>;
  selectedKeys: string[];
  context: Context;
  mapper: Mappers['filterItems'];
};
export type EnsureSearchAction = InitListingAction & { ogState: AppState };
export type ExecuteSearchAction = EnsureSearchAction & {
  preload: boolean;
  queryParams: QueryParams;
};

export type SetSearchEntriesParams = {
  type: string;
  context: Context;
  defaultLang: string;
  facet: string;
  mappers: Mappers;
  nextFacet: Facet;
  preload: boolean;
  ogState: AppState;
  debug: DebugFlags;
  params: SearchParams;
};

export type SetSearchEntriesAction = Action & SetSearchEntriesParams;

export type ApplySearchFilterAction = Action & {
  filter: string;
  key: string;
  isUnknownItem: boolean;
  scrollToElement?: string;
};
export type ApplySearchFilterActionCreator = (
  filter: string,
  key: string
) => ApplySearchFilterAction;

export type ClearFiltersAction = Action;
export type ClearFiltersActionCreator = (
  filterKey?: string
) => ClearFiltersAction;

export type UpdateCurrentFacetAction = Action & { facet: string };
export type UpdateCurrentFacetActionCreator = (
  facet: string
) => UpdateCurrentFacetAction;

export type UpdateCurrentTabAction = Action & { id: number };
export type UpdateCurrentTabActionCreator = (
  id: number
) => UpdateCurrentFacetAction;

export type UpdateSearchTermAction = Action & { term: string };
export type UpdateSearchTermActionCreator = (
  term: string
) => UpdateSearchTermAction;

export type UpdateSortOrderAction = Action & {
  orderBy: string;
  facet: string;
};
export type UpdateSortOrderActionCreator = (
  orderBy: string,
  facet: string
) => UpdateSortOrderAction;

export type UpdatePageIndexAction = Action & {
  pageIndex: number;
  scrollToElement?: string;
};
export type UpdatePageIndexActionCreator = (
  pageIndex: number
) => UpdatePageIndexAction;

export type UpdatePageSizeAction = Action & {
  pageSize: number;
  scrollToElement?: string;
};
export type UpdatePageSizeActionCreator = (
  pageSize: number
) => UpdatePageSizeAction;
