import { Reducer } from "../../../../node_modules/redux";
import { Effect } from 'redux-saga/effects';
export declare const injectReducer: ({ key, reducer }: {
    key: string;
    reducer: Reducer;
}, store?: import("../../../../node_modules/redux").Store<import("../../..").AppState, import("../../../../node_modules/redux").Action, unknown> & {
    runSaga: (sagas: Effect[] | (() => Generator)) => import("redux-saga").Task;
    close: () => void;
    initialSagas: Set<any>;
    injectedReducers: any;
    injectedSagas: any;
    createReducer: (injectedReducers?: any) => Reducer<import("../../..").AppState>;
}) => void;
export declare const injectSaga: ({ key, saga }: {
    key: string;
    saga: Effect[];
}, store?: import("../../../../node_modules/redux").Store<import("../../..").AppState, import("../../../../node_modules/redux").Action, unknown> & {
    runSaga: (sagas: Effect[] | (() => Generator)) => import("redux-saga").Task;
    close: () => void;
    initialSagas: Set<any>;
    injectedReducers: any;
    injectedSagas: any;
    createReducer: (injectedReducers?: any) => Reducer<import("../../..").AppState>;
}) => void;
