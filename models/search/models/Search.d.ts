import { Entry } from 'contensis-delivery-api/lib/models';
import MappingTemplate from 'jsonpath-mapper/dist/models/Template';
import { Context } from './Enums';
import { FieldOperators, LogicOperators } from './Queries';
import { AppState } from './SearchState';
export declare type Tab = {
    /** The facet to render as default */
    defaultFacet?: string;
    /** The zero-based incrementing id assigned to the tab  */
    id: number;
    /** The tab's label for rendering  */
    label: string;
    /** The facet to render the total results count as default */
    totalCount?: string;
};
export declare type CustomApi = {
    /** The uri of the REST API implementing a simple GET request */
    uri: string;
};
export declare type Listing = {
    /** Display title */
    title?: string;
    /** Experimental: use a custom API to retrieve search results */
    customApi?: CustomApi;
} | {
    /** Experimental: override the rootUrl of the Delivery API client  */
    env?: string;
    /** An object with a key for each filter that is required in this facet */
    filters?: SearchFilters;
    /** Use this to target the search to a project other than the default configured */
    projectId?: string;
    /** Query params object to drive the search for this facet */
    queryParams: SearchQueryParams;
    /** Display title */
    title?: string;
};
export declare type SearchFacet = {
    /** The first facet to be shown if no facet is supplied via a route parameter [default false] */
    isDefault?: boolean;
    /** Set to true to temporarily disable the facet [default false] */
    isDisabled?: boolean;
    /** The id of the tab the facet applies to. Use 0 for default or the id assigned to the tab */
    tabId?: number;
} & Listing;
export declare type SearchFilters = {
    [key: string]: SearchFilter;
};
export declare type SearchFilter = {
    /** The content type id we will dynamically load entries from and load into state under the items[] */
    contentTypeId?: string | string[];
    /** An array of CustomWhereClause to include in the search query when dynamically loading entries via the contentTypeId key */
    customWhere?: CustomWhereClause;
    /** Use this to set a specific value to render for the initial / unselected option in this filter */
    defaultValue?: string;
    /** The content type field we will apply the filter key to, to filter the list of returned results. */
    fieldId: string | string[];
    /** The Delivery API search operator we will use to filter the list of returned results. */
    fieldOperator?: FieldOperators;
    /** The Delivery API locgical operator we will use to filter the list of returned results when multiple filter items are selected. */
    logicOperator?: LogicOperators;
    /** The taxonomy path we will dynamically load into state under the items[] */
    path?: string;
    /** Setting to true will sync selected filters under matching filter keys in other facets */
    isGrouped?: boolean;
    /** Setting to true will ensure only one value can be selected at a time for this filter */
    isSingleSelect?: boolean;
    /** Supply an empty array or a hardcoded list of FilterItem depending on the type of filter we require */
    items: FilterItem[];
    /** Set to false to not include this filter in filters prop */
    renderable?: boolean;
    /** The title to render next to the filter */
    title: string;
};
export declare type FilterItem = {
    /** Whether the filter is in a selected state */
    isSelected?: boolean;
    /** This will usually be the entry id or the taxonomy key */
    key: string;
    /** This will usually be the entry slug or the taxonomy path */
    path?: string;
    /** The title to render next to the filter item */
    title: string;
};
export declare type FeaturedResults = {
    /** If the featured results are flagged with a certain field value, specify the fieldId containing the flagged value */
    fieldId?: string | string[];
    /** If the featured results are flagged with a certain field value, specify the value in the flagged fieldId */
    fieldValue?: any;
    /** If the featured results exist in a special content type provide a contentTypeId */
    contentTypeId?: string | string[];
    /** The number of featured results to retrieve */
    count?: number;
};
export declare type SearchQueryParams = {
    /** An array of assetTypes to search over (sys.dataFormat == 'asset'); Prefix an entry with a "!" to exclude that asset type from the search */
    assetTypes?: string[];
    /** An array of contentTypeIds to search over (sys.dataFormat == 'entry'); Prefix an entry with a "!" to exclude that content type from the search */
    contentTypeIds: string[];
    /** An array of CustomWhereClause to include in the search query */
    customWhere?: CustomWhereClause;
    /** Add parameters to drive an additional set of featured results */
    featuredResults?: FeaturedResults;
    /** An array of fields to return for each entry in the items[] */
    fields?: string[];
    /** Specify a boolean type field to use for excluding entries we don't want returned in search result  */
    includeInSearch?: string[];
    /** Whether or not to load all results with the first page and handle all pagination yourself */
    internalPaging?: boolean;
    /** The linkDepth to apply to the facet search (defaults to 0) */
    linkDepth?: number;
    /** Alters the pagination style to retain previously loaded pages of results after loading next pages */
    loadMorePaging?: boolean;
    /** An array of orderBy expressions to add to the search query */
    orderBy?: string[];
    /** The number of items returned per page in the search */
    pageSize?: number;
    /** Allow a configured minilist to read the search.term set in state (defaults to false) */
    useSearchTerm?: boolean;
    /** An array of webpageTemplates to search over (sys.dataFormat == 'webpage'); Prefix an entry with a "!" to exclude that webpage template from the search */
    webpageTemplates?: string[];
    /** An array of WeightedSearchField to include in the search query */
    weightedSearchFields?: WeightedSearchField[];
};
export declare type WhereClause = {
    /** The field we wish to query */
    field: string;
    /** The value we want to evaluate with the chosen operator */
    [key: string]: any;
};
/**
 * N.B. This shares syntax with adding where operators to a search query when using the Delivery API via HTTP, and should be used sparingly for exceptional cases where the standard query falls short
 */
export declare type CustomWhereClause = (WhereClause | {
    not: WhereClause;
} | {
    and: WhereClause[];
} | {
    or: WhereClause[];
})[];
export declare type WeightedSearchField = {
    /** The id of the field to query against */
    fieldId: string;
    /** The weighting applied to the field */
    weight: number;
};
/**
 * To provide all the necessary state information in order to render a fully featured search using Zengenti Isomorphic Base
 *
 * You need to provide a search configuration to the reducer so the initialState for your search can be set, this tells the package what you need your search to do, and where to get its data from.
 */
export declare type SearchConfig = {
    /** An object with a key for each facet that is required for the search */
    facets: {
        [key: string]: SearchFacet;
    };
    /** An object with a key for each independent listing that is required for the site */
    listings?: {
        [key: string]: Listing;
    };
    /** An object with a key for each independent listing that is required for the site */
    minilist?: {
        [key: string]: Listing;
    };
    /** An Array of Tabs */
    tabs: Tab[];
};
export declare type ConfigTypes = {
    [key: string]: SearchFacet;
} | {
    [key: string]: Listing;
};
/**
 * Type your mapper for mapping API responses (entries) into usable props for your components to render
 */
export declare type SearchResultsMapper<Target = any, Source = Entry> = (entries: Source[], facet?: string, context?: Context, state?: AppState) => Target[];
/**
 * Type your custom filter item mapping function with this to ensure correctly typed FilterItems are returned to work with search functions
 */
export declare type FilterItemsMapper<T = Entry> = (entries: T[]) => FilterItem[];
/**
 * The uri object type we need to return from the Navigate mapper after any search action has been called
 */
export declare type NavigateUri = {
    path: string;
    search: string;
    hash: string;
};
/**
 * Type your jsonpath-mapper mapping template with this to map your next search uri to your custom uri structure after calling any search action
 */
export declare type SearchUriMapping = MappingTemplate<SearchStateParams>;
/**
 * Type the argument passed to the Navigate mapper, this provides the relevant keys and data available to manipulate and return the next uri after any search action has been called
 */
export declare type SearchStateParams = {
    state: AppState;
    facet?: string;
    orderBy?: string;
    pageIndex: number;
    term?: string;
};
/** Type your Navigate mapper with this, the Navigate mapper is called after any search action has been called and is required to return the next uri to be parsed by your project's route configuration and provide the right uri parameters to drive the next search query and resulting state */
export declare type NavigateMapper = ({ state, facet, orderBy, pageIndex, term, }: SearchStateParams) => NavigateUri;
/** Type your Results Info mapper with this, remember "resultsInfo" prop is a custom object you define yourself - you can provide any keys you wish, conveying detailed messaging or UX tweaks to cover all kinds of scenarios based on data in the search state at that time */
export declare type ResultsInfoMapper<T = any> = (state: AppState) => T;
/** Experimental**: If you are trying to use the custom API feature you can add specific keys to the resultant querystring that for the custom API GET request */
export declare type CustomApiParamsMapper = (queryParams: SearchQueryParams) => {
    [key: string]: string;
};
/** Type your Mappers object with this type to provide a accurate, type-safe "mapper" argument to your search implementation */
export declare type Mappers = {
    customApi?: CustomApiParamsMapper;
    results: SearchResultsMapper;
    filterItems?: FilterItemsMapper;
    navigate?: NavigateMapper;
    resultsInfo?: ResultsInfoMapper;
};
/** SearchTransformations is just an alias for Mappers object / argument */
export declare type SearchTransformations = Mappers;
