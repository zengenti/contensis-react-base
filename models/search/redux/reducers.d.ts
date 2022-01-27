import { SearchConfig } from '../models/Search';
import { Context } from '../models/Enums';
import { SearchState } from '../models/SearchState';
declare const _default: (config: SearchConfig) => <Base extends {
    readonly context: "facets" | "listings" | "minilist";
    readonly currentFacet: string;
    readonly currentListing: string;
    readonly term: string;
    readonly facets: {
        readonly [x: string]: {
            readonly entries: {
                readonly isLoading: boolean;
                readonly isError: boolean;
                readonly error?: any;
            };
            readonly featuredEntries: {
                readonly isLoading: boolean;
                readonly isError: boolean;
                readonly error?: any;
            };
            readonly featuredResults: readonly any[];
            readonly filters: {
                readonly [x: string]: {
                    readonly contentTypeId?: string | undefined;
                    readonly customWhere?: readonly ({
                        readonly [x: string]: any;
                        readonly field: string;
                    } | {
                        readonly not: {
                            readonly [x: string]: any;
                            readonly field: string;
                        };
                    } | {
                        readonly and: readonly {
                            readonly [x: string]: any;
                            readonly field: string;
                        }[];
                    } | {
                        readonly or: readonly {
                            readonly [x: string]: any;
                            readonly field: string;
                        }[];
                    })[] | undefined;
                    readonly fieldId?: string | undefined;
                    readonly isGrouped?: boolean | undefined;
                    readonly isSingleSelect?: boolean | undefined;
                    readonly isLoading: boolean;
                    readonly isError: boolean;
                    readonly items?: readonly {
                        readonly contentTypeId?: string | undefined;
                        readonly title?: string | undefined;
                        readonly type?: string | undefined;
                        readonly key: string;
                        readonly path?: string | undefined;
                        readonly isSelected: boolean;
                    }[] | undefined;
                    readonly path?: string | undefined;
                    readonly renderable?: boolean | undefined;
                    readonly title?: string | undefined;
                };
            };
            readonly pagingInfo: {
                readonly isLoading: boolean;
                readonly pageCount: number;
                readonly pageSize: number;
                readonly pageIndex: number;
                readonly pagesLoaded: readonly number[];
                readonly prevPageIndex: number;
                readonly totalCount: number;
            };
            readonly preloaded: boolean;
            readonly projectId: string;
            readonly queryDuration: number;
            readonly queryParams: {
                readonly contentTypeIds: readonly string[];
                readonly dynamicOrderBy: readonly string[];
                readonly excludeIds: readonly string[];
                readonly internalPaging: boolean;
                readonly loadMorePaging: boolean;
                readonly useSearchTerm: boolean;
            };
            readonly results: readonly any[];
            readonly tabId: number;
            readonly title: string;
        };
    };
    readonly listings: {
        readonly [x: string]: {
            readonly entries: {
                readonly isLoading: boolean;
                readonly isError: boolean;
                readonly error?: any;
            };
            readonly featuredEntries: {
                readonly isLoading: boolean;
                readonly isError: boolean;
                readonly error?: any;
            };
            readonly featuredResults: readonly any[];
            readonly filters: {
                readonly [x: string]: {
                    readonly contentTypeId?: string | undefined;
                    readonly customWhere?: readonly ({
                        readonly [x: string]: any;
                        readonly field: string;
                    } | {
                        readonly not: {
                            readonly [x: string]: any;
                            readonly field: string;
                        };
                    } | {
                        readonly and: readonly {
                            readonly [x: string]: any;
                            readonly field: string;
                        }[];
                    } | {
                        readonly or: readonly {
                            readonly [x: string]: any;
                            readonly field: string;
                        }[];
                    })[] | undefined;
                    readonly fieldId?: string | undefined;
                    readonly isGrouped?: boolean | undefined;
                    readonly isSingleSelect?: boolean | undefined;
                    readonly isLoading: boolean;
                    readonly isError: boolean;
                    readonly items?: readonly {
                        readonly contentTypeId?: string | undefined;
                        readonly title?: string | undefined;
                        readonly type?: string | undefined;
                        readonly key: string;
                        readonly path?: string | undefined;
                        readonly isSelected: boolean;
                    }[] | undefined;
                    readonly path?: string | undefined;
                    readonly renderable?: boolean | undefined;
                    readonly title?: string | undefined;
                };
            };
            readonly pagingInfo: {
                readonly isLoading: boolean;
                readonly pageCount: number;
                readonly pageSize: number;
                readonly pageIndex: number;
                readonly pagesLoaded: readonly number[];
                readonly prevPageIndex: number;
                readonly totalCount: number;
            };
            readonly preloaded: boolean;
            readonly projectId: string;
            readonly queryDuration: number;
            readonly queryParams: {
                readonly contentTypeIds: readonly string[];
                readonly dynamicOrderBy: readonly string[];
                readonly excludeIds: readonly string[];
                readonly internalPaging: boolean;
                readonly loadMorePaging: boolean;
                readonly useSearchTerm: boolean;
            };
            readonly results: readonly any[];
            readonly tabId: number;
            readonly title: string;
        };
    };
    readonly minilist: {
        readonly [x: string]: {
            readonly entries: {
                readonly isLoading: boolean;
                readonly isError: boolean;
                readonly error?: any;
            };
            readonly featuredEntries: {
                readonly isLoading: boolean;
                readonly isError: boolean;
                readonly error?: any;
            };
            readonly featuredResults: readonly any[];
            readonly filters: {
                readonly [x: string]: {
                    readonly contentTypeId?: string | undefined;
                    readonly customWhere?: readonly ({
                        readonly [x: string]: any;
                        readonly field: string;
                    } | {
                        readonly not: {
                            readonly [x: string]: any;
                            readonly field: string;
                        };
                    } | {
                        readonly and: readonly {
                            readonly [x: string]: any;
                            readonly field: string;
                        }[];
                    } | {
                        readonly or: readonly {
                            readonly [x: string]: any;
                            readonly field: string;
                        }[];
                    })[] | undefined;
                    readonly fieldId?: string | undefined;
                    readonly isGrouped?: boolean | undefined;
                    readonly isSingleSelect?: boolean | undefined;
                    readonly isLoading: boolean;
                    readonly isError: boolean;
                    readonly items?: readonly {
                        readonly contentTypeId?: string | undefined;
                        readonly title?: string | undefined;
                        readonly type?: string | undefined;
                        readonly key: string;
                        readonly path?: string | undefined;
                        readonly isSelected: boolean;
                    }[] | undefined;
                    readonly path?: string | undefined;
                    readonly renderable?: boolean | undefined;
                    readonly title?: string | undefined;
                };
            };
            readonly pagingInfo: {
                readonly isLoading: boolean;
                readonly pageCount: number;
                readonly pageSize: number;
                readonly pageIndex: number;
                readonly pagesLoaded: readonly number[];
                readonly prevPageIndex: number;
                readonly totalCount: number;
            };
            readonly preloaded: boolean;
            readonly projectId: string;
            readonly queryDuration: number;
            readonly queryParams: {
                readonly contentTypeIds: readonly string[];
                readonly dynamicOrderBy: readonly string[];
                readonly excludeIds: readonly string[];
                readonly internalPaging: boolean;
                readonly loadMorePaging: boolean;
                readonly useSearchTerm: boolean;
            };
            readonly results: readonly any[];
            readonly tabId: number;
            readonly title: string;
        };
    };
    readonly tabs: readonly {
        readonly currentFacet: string;
        readonly defaultFacet: string;
        readonly id: number;
        readonly label: string;
        readonly totalCount: number;
    }[];
    readonly config: {
        readonly [x: string]: boolean;
    };
}>(base?: Base | undefined, action: {
    [key: string]: any;
    context: keyof typeof Context;
    facet: string;
    params: {
        [key: string]: string;
    };
}) => import("immer/dist/internal").WritableDraft<SearchState> | Base;
export default _default;
