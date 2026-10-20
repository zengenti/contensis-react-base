export declare const loginSagas: (import("redux-saga/effects").ForkEffect<never> | import("redux-saga/effects").CallEffect<void>)[];
export declare function handleRequiresLoginSaga(action: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<any> | import("redux-saga/effects").PutEffect<{
    type: string;
    cookies: any;
    securityToken: string | (string | null)[] | null;
}>, any, any>;
export declare function refreshSecurityToken(): Generator<any, any, unknown>;
