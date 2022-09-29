import { PagedList } from 'contensis-core-api';
import { Entry } from 'contensis-delivery-api/lib/models';
import { LinkDepthApiFilters, LinkFields } from './api.d';
declare class QueryLevelResults {
    level: number;
    contentTypeIds: string[];
    linkFieldIds: string[];
    linkFields: LinkFields;
    filters: LinkDepthApiFilters;
    sharedFilters: LinkDepthApiFilters;
    returnEntries: boolean;
    resolveFirstParent: boolean;
    validatedLinks: {
        contentTypeId: string;
        linkFieldId: string;
        entryIds: string[];
    }[];
    parent: QueryLevelResults | undefined;
    children: QueryLevelResults[];
    runFirstQuery: boolean;
    runFinalQuery: boolean;
    private params;
    private debug;
    private firstQuery;
    private firstResults;
    private finalQuery;
    private finalResults;
    constructor({ level, contentTypeIds, linkFields, filters, sharedFilters, returnEntries, resolveFirstParent, params, parent, debug, }: {
        level: number;
        contentTypeIds: string[];
        linkFields: LinkFields;
        filters: LinkDepthApiFilters;
        sharedFilters: LinkDepthApiFilters;
        returnEntries?: boolean;
        resolveFirstParent?: boolean;
        params: {
            [key: string]: string | undefined;
        };
        parent?: QueryLevelResults;
        debug?: boolean;
    });
    AddChild: ({ child }: {
        child: QueryLevelResults;
    }) => void;
    RunFirstQuery: () => Promise<void>;
    RunFinalQuery: () => Promise<void>;
    GetResultsEntries: () => Entry[];
    GetResults: () => PagedList<Entry>;
}
export default QueryLevelResults;
