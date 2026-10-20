/** `deliveryError` is the error the Delivery fetch threw; the return value is
 *  whatever should end `getRouteSaga` for this run, so the caller does
 *  `return yield call(idpDeliveryAuthErrorSaga, action, nodeError)`. */
export declare function idpDeliveryAuthErrorSaga(action: any, deliveryError: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<any> | import("redux-saga/effects").CallEffect<import("..").RefreshOutcome>, any, import("../session").IdpClientCredentials | undefined>;
