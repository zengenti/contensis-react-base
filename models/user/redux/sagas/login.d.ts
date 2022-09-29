export function handleRequiresLoginSaga(action: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<Generator<import("redux-saga/effects").SelectEffect | Promise<undefined[] | Error[] | {
    message: string;
}[] | {
    message: string;
    data: any;
}[]> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        isLoading: boolean;
    };
}> | import("redux-saga/effects").CallEffect<Generator<Promise<{
    authenticationState: {
        clientCredentials: null;
        isAuthenticated: boolean;
        isAuthenticationError: boolean;
        isError: boolean;
    };
    user: Error | {
        groups: any;
    } | null | undefined;
}> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: any;
    user: any;
}>, void, {
    authenticationState: any;
    user: any;
}>> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        isError: boolean;
        errorMessage: any;
    };
}>, any, [any, any]>> | import("redux-saga/effects").PutEffect<{
    type: string;
    securityToken: any;
}>, void, any>;
export function refreshSecurityToken(): Generator<any, void, unknown>;
export const loginSagas: import("redux-saga/effects").ForkEffect<never>[];
