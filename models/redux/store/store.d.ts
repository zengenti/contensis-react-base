import { Action, Store } from "../../../node_modules/redux";
import createSagaMiddleware from 'redux-saga';
import { AppState, StateType } from "../../models";
import { History, MemoryHistory } from 'history';
type ReduxAppStore = Store<AppState, Action>;
type ReduxSagaAppStore = ReduxAppStore & {
    runSaga: ReturnType<typeof createSagaMiddleware>['run'];
    close: () => void;
};
/** A no-op reducer to serve for server-rendered reducers
 * that are re-injected client-side */
export declare const stubReducer: (state?: null) => null;
export declare let reduxStore: ReduxSagaAppStore;
declare const _default: (featureReducers: any, initialState: AppState, history: History | MemoryHistory, stateType: StateType) => Promise<ReduxSagaAppStore>;
export default _default;
