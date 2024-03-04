export function ensureNodeTreeSaga(action: any): Generator<Promise<import("contensis-delivery-api").Node> | import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    type: string;
}>, void, unknown>;
export const navigationSagas: import("redux-saga/effects").ForkEffect<never>[];
