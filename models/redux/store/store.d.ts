import { Action, Store } from "../../../node_modules/redux";
import createSagaMiddleware from 'redux-saga';
import { AppState } from '../appstate';
import { History, MemoryHistory } from 'history';
import { StateType } from "../../config";
type ReduxAppStore = Store<AppState, Action<any>>;
type ReduxSagaAppStore = ReduxAppStore & {
    runSaga: ReturnType<typeof createSagaMiddleware>['run'];
    close: () => void;
};
export declare let reduxStore: ReduxSagaAppStore;
declare const _default: (featureReducers: any, initialState: AppState, history: History | MemoryHistory, stateType: StateType) => Promise<ReduxSagaAppStore>;
export default _default;
