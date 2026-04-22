import { Entry } from 'contensis-delivery-api';
import { PagedSearchList } from 'contensis-core-api';
export type TimedSearchResponse = {
    duration: number;
    payload: PagedSearchList<Entry> | any[];
};
