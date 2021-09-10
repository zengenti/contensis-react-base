import { List, Map, OrderedMap } from 'immutable';
import { CustomWhereClause } from '../models/Search';
export declare const entries: Map<string, boolean | List<any>>;
export declare const pagingInfo: Map<string, number | boolean | List<any>>;
export declare const searchFacet: OrderedMap<string, string | number | List<any> | Map<string, boolean | List<any>> | Map<string, number | boolean | List<any>> | Map<unknown, unknown> | null>;
export declare const searchTab: Map<string, string | number | OrderedMap<unknown, unknown> | undefined>;
export declare const filtering: Map<string, string | boolean | List<CustomWhereClause> | List<Map<string, string | boolean>>>;
export declare const filterItem: Map<string, string | boolean>;
export declare const initialState: OrderedMap<string, string | Map<string, boolean> | OrderedMap<string, OrderedMap<string, OrderedMap<string, string | number | List<any> | Map<string, boolean | List<any>> | Map<string, number | boolean | List<any>> | Map<unknown, unknown> | null>>> | List<import("../models/SearchState").Tab>>;
