import { VersionStatus } from 'contensis-core-api';
import { AccessTokenConfig } from "../../../models/config/AccessTokenConfig";
/** Release uri for any protected token  preview and live are the same node, and the request decides which token
 *  the caller gets, so nothing needs supplying by the caller. */
export declare const ACCESS_TOKEN_URI = "/crb-api/auth/access-token";
/** The outcome of resolving a request against the `accessTokens` config.
 *  `undefined` means no config is in play and the startup defaults stand -
 *  anything else is authoritative over them, including an empty result. */
export type ResolvedAccessToken = {
    /** Token to write into the page. Undefined when the client must get its own. */
    accessToken?: string;
    /** Where the client requests a token. Only set when auth is required. */
    releaseUri?: string;
};
/** The token configured for a scope in a project, falling back to the
 *  top-level entry for that scope. */
export declare const getAccessToken: (config: AccessTokenConfig | undefined, project: string, scope: VersionStatus) => import("../../../models/config/AccessTokenConfig").ScopedAccessToken | undefined;
/**
 * Release the access token in SSR, or provide a release URI if the resolved
 * config has `requireLogin` set (a `true`/array means any authenticated
 * caller, or only the listed user groups, may fetch it).
 */
export declare const resolveAccessToken: (config: AccessTokenConfig | undefined, project: string, versionStatus: VersionStatus) => ResolvedAccessToken | undefined;
/** Serialise the resolved token into the script tag written into the SSR page response */
export declare const accessTokenScript: (resolved?: ResolvedAccessToken) => string;
export default resolveAccessToken;
