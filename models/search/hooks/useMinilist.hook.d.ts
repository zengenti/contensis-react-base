import { MinilistProps, UseMinilistProps } from '../models/SearchProps';
declare const useMinilist: <SearchResults extends Record<string, any>>({ id, config, excludeIds, mapper, mappers, params, defaultLang, debug, }?: UseMinilistProps) => MinilistProps<SearchResults>;
export default useMinilist;
