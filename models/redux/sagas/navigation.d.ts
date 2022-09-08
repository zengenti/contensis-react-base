export function ensureNodeTreeSaga(action: any): Generator<import("redux-saga/effects").SelectEffect | Promise<import("contensis-delivery-api/lib/models").Node> | import("redux-saga/effects").PutEffect<{
    type: string;
}>, void, unknown>;
export const navigationSagas: import("redux-saga/effects").ForkEffect<never>[];
