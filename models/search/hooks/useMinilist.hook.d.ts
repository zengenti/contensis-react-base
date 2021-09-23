import { UseMinilistProps } from '../models/SearchProps';
declare const useMinilist: ({ id, config, excludeIds, mapper, mappers, params, defaultLang, debug, }?: UseMinilistProps) => {
    filters: import("../models/SearchState").Filters;
    isLoading: boolean;
    pagingInfo: import("../models/SearchState").Paging;
    results: any[];
    searchTerm: string;
    title: string;
};
export default useMinilist;
