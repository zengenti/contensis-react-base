import { History, MemoryHistory } from 'history';
import { Action, Store, Reducer } from "../../../node_modules/redux";
import { Task } from 'redux-saga';
import { Effect } from 'redux-saga/effects';
import { AppState, StateType } from "../../models";
type ReduxAppStore = Store<AppState, Action>;
type PatchedRunSaga = (sagas: Effect[] | (() => Generator)) => Task;
type ReduxSagaAppStore = ReduxAppStore & {
    runSaga: PatchedRunSaga;
    close: () => void;
    initialSagas: Set<any>;
    injectedReducers: any;
    injectedSagas: any;
    createReducer: (injectedReducers?: any) => Reducer<AppState>;
};
/** A no-op reducer to serve for server-rendered reducers
 * that are re-injected client-side */
export declare const stubReducer: (state?: null) => null;
export declare let reduxStore: ReduxSagaAppStore;
declare const _default: (featureReducers: any, initialState: AppState, history: History | MemoryHistory, stateType: StateType) => Promise<ReduxSagaAppStore>;
export default _default;
