import { Reducer } from "../../../../node_modules/redux";
import { Effect } from 'redux-saga/effects';
export declare const injectRedux: ({ key, reducer, saga }: {
    key: string;
    reducer?: Reducer;
    saga?: Effect[];
}, store?: import("../../../../node_modules/redux").Store<import("../../..").AppState, import("../../../../node_modules/redux").Action, unknown> & {
    runSaga: (sagas: Effect[] | (() => Generator)) => import("redux-saga").Task;
    close: () => void;
    initialSagas: Set<any>;
    injectedReducers: any;
    injectedSagas: any;
    createReducer: (injectedReducers?: any) => Reducer<import("../../..").AppState>;
}) => void;
export declare const useInjectRedux: ({ key, reducer, saga }: {
    key: string;
    reducer?: Reducer;
    saga?: Effect[];
}, store?: import("../../../../node_modules/redux").Store<import("../../..").AppState, import("../../../../node_modules/redux").Action, unknown> & {
    runSaga: (sagas: Effect[] | (() => Generator)) => import("redux-saga").Task;
    close: () => void;
    initialSagas: Set<any>;
    injectedReducers: any;
    injectedSagas: any;
    createReducer: (injectedReducers?: any) => Reducer<import("../../..").AppState>;
}) => void;
