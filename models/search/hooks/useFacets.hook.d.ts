import { SearchProps, UseFacetsProps } from '../models/SearchProps';
declare const useFacets: <SearchResults extends Record<string, any>>({ mappers }?: UseFacetsProps) => SearchProps<SearchResults>;
export default useFacets;
