import { VersionStatus } from 'contensis-core-api';
import { AccessTokenConfig } from '~/models/config/AccessTokenConfig';

/** Release uri for any protected token  preview and live are the same node, and the request decides which token
 *  the caller gets, so nothing needs supplying by the caller. */
export const ACCESS_TOKEN_URI = '/crb-api/auth/access-token';

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
export const getAccessToken = (
  config: AccessTokenConfig | undefined,
  project: string,
  scope: VersionStatus
) => config?.projects?.[project]?.[scope] ?? config?.[scope];

/**
 * Release the access token in SSR, or provide a release URI if the resolved
 * config has `requireLogin` set (a `true`/array means any authenticated
 * caller, or only the listed user groups, may fetch it).
 */
export const resolveAccessToken = (
  config: AccessTokenConfig | undefined,
  project: string,
  versionStatus: VersionStatus
): ResolvedAccessToken | undefined => {
  // Unconfigured. Existing consumers keep the token from the environment startup defaults
  if (!config) return undefined;

  const accessToken = getAccessToken(config, project, versionStatus);

  // Nothing configured for the scope this request resolved to. Neither a
  // token nor somewhere to fetch one, so the request will fail where it is
  // made rather than being hidden behind a blank shell.
  // REVIEW: misconfiguration - worth validating at startup instead.
  if (!accessToken?.token) {
    console.warn(
      `[accessToken] project "${project}" resolved to versionStatus ${versionStatus} with no token configured`
    );
    return {};
  }

  // Not protected: the token goes into the page and SSR renders normally
  if (!accessToken.requireLogin) return { accessToken: accessToken.token };

  // Protected: skip SSR (render dynamic) and the client must authenticate,
  // then request the access token from the release URI.
  return { releaseUri: `${ACCESS_TOKEN_URI}?versionStatus=${versionStatus}` };
};

/** Serialise the resolved token into the script tag written into the SSR page response */
export const accessTokenScript = (resolved?: ResolvedAccessToken) => {
  // Nothing configured - leave the startup defaults alone
  if (!resolved) return '';

  const { accessToken, releaseUri } = resolved;

  const values = [
    // Always written, including as null. Omitting it would leave a token from
    // the startup defaults in place, which the client would use in good faith.
    `accessToken: ${JSON.stringify(accessToken ?? null)}`,
    releaseUri && `releaseUri: ${JSON.stringify(releaseUri)}`,
  ].filter(Boolean);

  // Merged over anything already on the context. startup.js applies its own
  // values as defaults beneath this, so it cannot overwrite them whichever
  // order the two scripts run in.
  return `window.DELIVERY_API_CONFIG = Object.assign(window.DELIVERY_API_CONFIG || {}, { ${values.join(
    ', '
  )} });`;
};

export default resolveAccessToken;
