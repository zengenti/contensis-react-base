import { Context } from '../models/Enums';
import { SearchConfig } from '../models/Search';
import { SearchParams } from '../models/SearchActions';
import { SearchState } from '../models/SearchState';
declare const _default: (config: SearchConfig) => (state?: SearchState | undefined, action: {
    [key: string]: any;
    context: keyof typeof Context;
    facet: string;
    params: SearchParams;
}) => SearchState;
export default _default;
