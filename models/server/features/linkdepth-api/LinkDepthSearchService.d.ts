import { LinkDepthApiConfig, LinkDepthApiFilters, LinkFields } from './api.d';
import QueryLevelResults from './QueryLevelResults';
export type LinkDepthSearchServiceConstuctorArgs = Partial<LinkDepthApiConfig> & {
    params: {
        [key: string]: string | undefined;
    };
    debug?: boolean;
};
declare class LinkDepthSearchService {
    contentTypeIds: string[];
    filters: LinkDepthApiFilters;
    sharedFilters: LinkDepthApiFilters;
    linkFields: LinkFields;
    params: {
        [key: string]: string | undefined;
    };
    debug: boolean;
    queryLevels: QueryLevelResults[];
    constructor({ contentTypeId, filters, sharedFilters, linkFields, params, debug, }: LinkDepthSearchServiceConstuctorArgs);
    DoSearch: () => Promise<any>;
    RunFinalQueries: () => Promise<any>;
    private InitQueryLevels;
}
export default LinkDepthSearchService;
