import { Entry } from 'contensis-delivery-api/lib/models';
import { PagedList } from 'contensis-core-api';
export declare type TimedSearchResponse = {
    duration: number;
    payload: PagedList<Entry> | any[];
};
