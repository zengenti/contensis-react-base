import { List, Map, OrderedMap } from 'immutable';
import { SearchConfig } from '../models/Search';
declare const _default: (config: SearchConfig) => (state: OrderedMap<string, string | Map<string, boolean> | OrderedMap<string, OrderedMap<string, OrderedMap<string, string | number | List<any> | Map<string, boolean | List<any>> | Map<string, number | boolean | List<any>> | Map<unknown, unknown> | null>>> | List<import("../models/SearchState").Tab>> | undefined, action: any) => any;
export default _default;
