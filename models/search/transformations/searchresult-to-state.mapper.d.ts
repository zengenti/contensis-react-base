import { default as mapSearchResultToState } from 'jsonpath-mapper';
import MappingTemplate from 'jsonpath-mapper/dist/models/Template';
import { LoadFiltersSearchResults } from '../models/SearchActions';
export declare const facetTemplate: any;
export declare const filterTemplate: MappingTemplate<LoadFiltersSearchResults>;
export default mapSearchResultToState;
