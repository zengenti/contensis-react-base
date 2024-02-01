export function convertSagaArray(sagas: any): any;
export function injectReducer({ key, reducer }: {
    key: any;
    reducer: any;
}, store?: import("../../../node_modules/redux").Store<import("../appstate").AppState, import("../../../node_modules/redux").Action<any>> & {
    runSaga: <S extends import("redux-saga").Saga<any[]>>(saga: S, ...args: Parameters<S>) => import("redux-saga").Task;
    close: () => void;
}): void;
export function injectSaga({ key, saga }: {
    key: any;
    saga: any;
}, store?: import("../../../node_modules/redux").Store<import("../appstate").AppState, import("../../../node_modules/redux").Action<any>> & {
    runSaga: <S extends import("redux-saga").Saga<any[]>>(saga: S, ...args: Parameters<S>) => import("redux-saga").Task;
    close: () => void;
}): void;
export function injectRedux({ key, reducer, saga }: {
    key: any;
    reducer: any;
    saga: any;
}, store?: import("../../../node_modules/redux").Store<import("../appstate").AppState, import("../../../node_modules/redux").Action<any>> & {
    runSaga: <S extends import("redux-saga").Saga<any[]>>(saga: S, ...args: Parameters<S>) => import("redux-saga").Task;
    close: () => void;
}): void;
export function useInjectRedux({ key, reducer, saga }: {
    key: any;
    reducer: any;
    saga: any;
}, store?: import("../../../node_modules/redux").Store<import("../appstate").AppState, import("../../../node_modules/redux").Action<any>> & {
    runSaga: <S extends import("redux-saga").Saga<any[]>>(saga: S, ...args: Parameters<S>) => import("redux-saga").Task;
    close: () => void;
}): void;
