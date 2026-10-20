import { SessionResult } from '../session';
export type RouteSessionOutcome = 'session' | 'no-session' | 'unknown';
/** The outcome recorded for this route change, if any. */
export declare const takeRouteSessionOutcome: (path?: string) => RouteSessionOutcome | undefined;
export declare const clearDeliveryReloadIfNot: (path?: string) => void;
export declare const hasDeliveryReloadFor: (path?: string) => boolean;
export declare const rememberDeliveryReload: (path?: string) => void;
/**
 * Resolve the session for this route change and put the result in state.
 * Never redirects, never deletes a cookie: the decision belongs to the
 * require-login saga.
 */
export declare function idpRouteSessionSaga(action: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    type: string;
    isLoading: boolean;
}> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        isLoading: boolean;
    };
}> | import("redux-saga/effects").CallEffect<SessionResult> | import("redux-saga/effects").PutEffect<{
    type: string;
    clearOnly: boolean;
}>, void, SessionResult>;
