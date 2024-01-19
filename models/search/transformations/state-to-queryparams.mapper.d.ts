import { QueryParams } from '../models/Queries';
import { AppState } from '../models/SearchState';
import { Context } from '../models/Enums';
import { EnsureSearchAction, SetSearchEntriesAction } from '../models/SearchActions';
type QueryParamsMapperParams = {
    context: Context;
    facet: string;
    action: EnsureSearchAction | SetSearchEntriesAction;
    state: AppState;
};
declare const mapStateToQueryParams: (sourceJson: QueryParamsMapperParams) => QueryParams;
export default mapStateToQueryParams;
