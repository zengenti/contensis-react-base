import { Action, Store } from "../../../node_modules/redux";
import createSagaMiddleware from 'redux-saga';
import { AppState, StateType } from "../../models";
import { History, MemoryHistory } from 'history';
type ReduxAppStore = Store<AppState, Action<any>>;
type ReduxSagaAppStore = ReduxAppStore & {
    runSaga: ReturnType<typeof createSagaMiddleware>['run'];
    close: () => void;
};
export declare let reduxStore: ReduxSagaAppStore;
declare const _default: (featureReducers: any, initialState: AppState, history: History | MemoryHistory, stateType: StateType) => Promise<ReduxSagaAppStore>;
export default _default;
