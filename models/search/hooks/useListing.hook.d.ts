import { ListingProps, UseListingProps } from '../models/SearchProps';
declare const useListing: <SearchResults extends Record<string, any>>({ mappers }?: UseListingProps) => ListingProps<SearchResults>;
export default useListing;
