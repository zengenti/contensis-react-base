import { AppState } from '../appstate';
import { History, MemoryHistory } from 'history';
import { StateType } from "../../config";
export declare let reduxStore: any;
declare const _default: (featureReducers: any, initialState: AppState, history: History | MemoryHistory, stateType: StateType) => Promise<any>;
export default _default;
