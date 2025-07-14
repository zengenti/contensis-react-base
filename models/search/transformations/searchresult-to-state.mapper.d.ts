import { default as mapSearchResultToState, MappingTemplate } from 'jsonpath-mapper';
import { LoadFiltersSearchResults } from '../models/SearchActions';
export declare const facetTemplate: any;
export declare const filterTemplate: MappingTemplate<LoadFiltersSearchResults>;
export default mapSearchResultToState;
