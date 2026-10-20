import { SessionResult } from '../session';
/**
 * Nobody is signed in on a route that needs somebody to be: go to `/idp/check`,
 * but only once per `returnPath` — coming straight back and failing again is an
 * error state, not another redirect.
 *
 * `scope` separates the guard a Delivery auth error arms from the one a missing
 * session arms; see `DELIVERY_GUARD`. Exported for that saga, whose 401 a refresh
 * did not fix ends up here too.
 */
export declare function idpAnonymousRouteSaga({ returnPath, scope, }: {
    returnPath: string;
    scope?: string;
}): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        errorMessage: string;
        isError: boolean;
        isLoading: boolean;
    };
}>, boolean, import("../session").IdpClientCredentials | undefined>;
/** The IDP replacement for `handleRequiresLoginSaga`. */
export declare function idpHandleRequiresLoginSaga(action: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<void> | import("redux-saga/effects").CallEffect<SessionResult> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken: string | undefined;
        };
        errorMessage: null;
        isAuthenticated: boolean;
        isAuthenticationError: boolean;
        isError: boolean;
        isLoading: boolean;
    };
    user: import("../../state").UserWithGroups;
}> | import("redux-saga/effects").CallEffect<true> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        errorMessage: string;
        isError: boolean;
        isLoading: boolean;
    };
}>, any, import("../../..").AppState & (SessionResult & (import("../session").IdpClientCredentials | undefined))>;
