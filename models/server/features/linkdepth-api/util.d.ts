import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList } from 'contensis-core-api';
/**
 * Util class holds our search results helper boilerplate methods
 */
export declare class Util {
    static GetIds(entries: Entry[], fieldId?: string): any[];
    static GetItems(result: PagedList<Entry>): Entry[];
    static GetResults(result: PagedList<Entry>): PagedList<Entry> | null;
}
export declare const mergeResults: (results: Entry[], parentResults: Entry[], replaceContentTypeIds: string[], linkFieldId: string) => Entry[];
