export function convertSagaArray(sagas: any): any;
export function injectReducer({ key, reducer }: {
    key: any;
    reducer: any;
}, store?: import("../../../node_modules/redux").Store<import("../..").AppState, import("../../../node_modules/redux").Action, unknown> & {
    runSaga: ReturnType<typeof import("redux-saga").default>["run"];
    close: () => void;
}): void;
export function injectSaga({ key, saga }: {
    key: any;
    saga: any;
}, store?: import("../../../node_modules/redux").Store<import("../..").AppState, import("../../../node_modules/redux").Action, unknown> & {
    runSaga: ReturnType<typeof import("redux-saga").default>["run"];
    close: () => void;
}): void;
export function injectRedux({ key, reducer, saga }: {
    key: any;
    reducer: any;
    saga: any;
}, store?: import("../../../node_modules/redux").Store<import("../..").AppState, import("../../../node_modules/redux").Action, unknown> & {
    runSaga: ReturnType<typeof import("redux-saga").default>["run"];
    close: () => void;
}): void;
export function useInjectRedux({ key, reducer, saga }: {
    key: any;
    reducer: any;
    saga: any;
}, store?: import("../../../node_modules/redux").Store<import("../..").AppState, import("../../../node_modules/redux").Action, unknown> & {
    runSaga: ReturnType<typeof import("redux-saga").default>["run"];
    close: () => void;
}): void;
