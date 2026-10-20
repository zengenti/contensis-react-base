import { SessionResult } from '../session';
/** From the first moment the store exists the member state reports loading, so
 *  every visitor gets the same value: server and client render alike, and a
 *  guard never sees "not loading, not authenticated" before the first check has
 *  settled. */
export declare function idpInitialUserStateSaga(): Generator<import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        isLoading: boolean;
    };
}>, void, unknown>;
/** `loginUser()`: there are no credentials to post — the member goes to
 *  `/idp/check` for the page they were on. Credentials passed in are ignored
 *  with one warning, so a site still posting them hears why nothing happened.
 *  The once-per-path loop guard does not apply to an explicit login click. */
export declare function idpLoginUserSaga(action?: any): Generator<import("redux-saga/effects").CallEffect<void>, void, unknown>;
/** `logoutUser(redirectPath)`: the reducer has already cleared the user, so this
 *  saga's only job is the navigation. identity-client clears its own cookies and
 *  ends the Keycloak session — we never touch a cookie. With `clearOnly` the
 *  dispatch is our own notice that another tab ended the session, so there is
 *  nothing to navigate to. */
export declare function idpLogoutUserSaga(action?: any): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").CallEffect<void>, void, unknown>;
/** `VALIDATE_USER`: work out who is signed in, from the cookies and a refresh if
 *  needed. Returns the logged-in boolean callers of the classic saga expected. */
export declare function idpValidateUserSaga(): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
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
}>, any, SessionResult>;
/** `refreshSecurityToken`, same no-argument signature, now refreshing through
 *  `/idp/refresh`. It updates the classic token we hold and never navigates:
 *  refreshing a token is not a decision to send anybody anywhere. */
export declare function idpRefreshSecurityTokenSaga(): Generator<import("redux-saga/effects").SelectEffect | import("redux-saga/effects").PutEffect<{
    type: string;
    clearOnly: boolean;
}> | import("redux-saga/effects").CallEffect<import("..").RefreshOutcome> | import("redux-saga/effects").PutEffect<{
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken: string | undefined;
        };
        isLoading: boolean;
    };
}>, void, import("../session").IdpClientCredentials | undefined>;
type ChangePasswordResult = {
    ok: true;
} | {
    ok: false;
    error: unknown;
};
/** Change password with the access token, through the same refresh-and-retry
 *  wrapper as everything else. No classic grant. */
export declare function idpChangePasswordSaga(action: any): Generator<import("redux-saga/effects").PutEffect<{
    type: string;
}> | import("redux-saga/effects").CallEffect<ChangePasswordResult>, void, ChangePasswordResult>;
export {};
