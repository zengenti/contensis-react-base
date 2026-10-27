import { UserWithGroups } from '../state';
export type IdpSession = {
    user: UserWithGroups;
    classicToken?: string;
};
export type SessionResult = {
    outcome: 'session';
    session: IdpSession;
} | {
    outcome: 'no-session';
} | {
    outcome: 'unknown';
};
/** Fetch current user and groups with a cookie-backed client, with the 401
 *  refresh-and-retry applied around both calls. */
export declare const buildSession: () => Promise<SessionResult>;
export declare const resolveSession: () => Promise<SessionResult>;
/** Has another tab changed who we are? The classic token cookie is the identity
 *  last put in state; if it is gone or different, this tab's view is stale —
 *  without the check tab B shows user B while its API calls act as user C. */
export declare const identityHasChanged: (classicTokenInState?: string | null) => boolean;
/**
 * Mapping a session onto the existing reducer, edited in one place only:
 * `LOGOUT_USER` holds the session under `USE_IDP` so nothing redirects while
 * `/idp/logout` is in flight. The actions below are written around three of its
 * quirks:
 *
 * - `SET_AUTHENTICATION_STATE` can never reset `isAuthenticated`
 *   (`isAuthenticated || state.isAuthenticated`), so ending a session goes
 *   through `LOGOUT_USER` instead — with an IDP-only `clearOnly` flag so the
 *   logout saga knows not to navigate.
 * - A `SET_AUTHENTICATION_STATE` that omits `clientCredentials` nulls them, so
 *   every resolving put carries the current value forward.
 * - A user without `email` throws, which `toStateUser` prevents.
 *
 * Redux holds the classic token and nothing else: no access token, no refresh
 * token, no expiry.
 */
/** What `selectClientCredentials` holds while `USE_IDP` is on. */
export type IdpClientCredentials = {
    contensisClassicToken?: string;
} | null;
export declare const idpResolvingUserAction: (clientCredentials?: IdpClientCredentials) => {
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        isLoading: boolean;
    };
};
export declare const idpSettledUserAction: (clientCredentials?: IdpClientCredentials) => {
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        isLoading: boolean;
    };
};
/** A member is signed in: identity-client's classic token is the only
 *  credential we keep. */
export declare const idpSessionUserAction: (session: IdpSession) => {
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
    user: UserWithGroups;
};
/** The classic token moved (another tab signed in as somebody else): update
 *  the credential without disturbing anything else the site is holding. */
export declare const idpClassicTokenUserAction: (classicToken?: string, clientCredentials?: IdpClientCredentials) => {
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken: string | undefined;
        };
        isLoading: boolean;
    };
};
/**
 * End the session in state only. `clearOnly` is the IDP logout saga's signal not
 * to navigate: this is us noticing that another tab ended the session, not the
 * member asking to log out.
 */
export declare const idpClearSessionAction: () => {
    type: string;
    clearOnly: boolean;
};
/** A failure we must show without ever implying the member logged themselves
 *  out. `clientCredentials` is carried forward so a transient error does not
 *  drop a session that may still be good. */
export declare const idpErrorUserAction: (errorMessage: string, clientCredentials?: IdpClientCredentials) => {
    type: string;
    authenticationState: {
        clientCredentials: {
            contensisClassicToken?: string;
        } | null;
        errorMessage: string;
        isError: boolean;
        isLoading: boolean;
    };
};
