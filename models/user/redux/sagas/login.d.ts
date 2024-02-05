export declare const loginSagas: import("redux-saga/effects").ForkEffect<never>[];
export declare function handleRequiresLoginSaga(action: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<Generator<import("redux-saga/effects").SelectEffect | Promise<any[]> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        isLoading: boolean;
    };
}> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        isError: boolean;
        errorMessage: any;
    };
}> | import("redux-saga/effects").CallEffect<Generator<Promise<{
    authenticationState: import("../../state").AuthenticationState;
    user: any;
}> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: any;
    user: any;
}>, void, {
    authenticationState: any;
    user: any;
}>>, any, [any, any]>> | import("redux-saga/effects").PutEffect<{
    type: string;
    cookies: any;
    securityToken: any;
}>, any, any>;
export declare function refreshSecurityToken(): Generator<any, void, unknown>;
