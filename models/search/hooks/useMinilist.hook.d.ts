import { Facet, Mappers } from '../models/Search';
import { DebugFlags } from '../models/SearchActions';
declare type UseMiniListProps = {
    id: string;
    config?: Facet;
    debug?: DebugFlags;
    defaultLang?: string;
    excludeIds?: string[];
    mapper?: Mappers['results'];
    mappers?: Mappers;
    params?: {
        [key: string]: string;
    };
};
declare const useMinilist: ({ id, config, excludeIds, mapper, mappers, params, defaultLang, debug, }?: UseMiniListProps) => {
    filters: import("../models/SearchState").Filters;
    isLoading: boolean;
    pagingInfo: import("../models/SearchState").Paging;
    results: any[];
    searchTerm: string;
    title: string;
};
export default useMinilist;
