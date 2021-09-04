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
    filters: Object;
    isLoading: any;
    pagingInfo: any;
    results: any[];
    searchTerm: any;
    title: any;
};
export default useMinilist;
