import { AppState } from '../models/SearchState';
declare type SearchStateParams = {
    state: AppState;
    facet?: string;
    orderBy?: string;
    pageIndex: number;
    term?: string;
};
declare const mapStateToSearchUri: (params: SearchStateParams) => {
    path: Location['pathname'];
    search: Location['search'];
    hash: Location['hash'];
};
export default mapStateToSearchUri;
