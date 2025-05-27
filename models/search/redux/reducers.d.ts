import { SearchConfig } from '../models/Search';
import { Context } from '../models/Enums';
import { SearchState } from '../models/SearchState';
declare const _default: (config: SearchConfig) => (state?: SearchState | undefined, action: {
    [key: string]: any;
    context: keyof typeof Context;
    facet: string;
    params: {
        [key: string]: string;
    };
}) => SearchState;
export default _default;
