import { VersionStatus } from 'contensis-core-api';
import { Express, RequestHandler } from 'express';
import to from 'await-to-js';

import { deliveryApi } from '~/util/ContensisDeliveryApi';
import { matchUserGroup } from '~/user/util/matchGroups';
import authenticateRequest, { getRequestCredentials } from './authenticateRequest';
import { ACCESS_TOKEN_URI, getAccessToken } from './resolveAccessToken';
import { AccessTokenConfig } from '~/models/config/AccessTokenConfig';
import { logError } from '~/util/errors';

/**
 * Release a protected access token to an authenticated caller.
 *
 * Preview and live sites are served by the same deployment, so the token a
 * caller receives is decided by the request, not by the uri they post to.
 *
 * This route is only registered when a scope is configured with `requireLogin`.
 */
export const makeAccessTokenApi = (
  app: Express,
  accessTokens?: AccessTokenConfig
) => {
  // This route serves the default project, set at container start.
  const isProtected = (['published', 'latest'] as VersionStatus[]).some(
    scope => {
      const accessToken = getAccessToken(accessTokens, PROJECT, scope);
      return !!accessToken?.token && !!accessToken.requireLogin;
    }
  );

  if (!isProtected) return;

  console.warn(
    `[accessTokenApi] accessTokens configured for project "${PROJECT}" require auth, registering ${ACCESS_TOKEN_URI}`
  );
  // POST prevents the response from being cached
  app.post(ACCESS_TOKEN_URI, makeAccessTokenMiddleware(accessTokens));
};

/** Produces the request handler for the access token api */
export const makeAccessTokenMiddleware =
  (accessTokens?: AccessTokenConfig): RequestHandler =>
  async (req, res) => {
    res.setHeader('Cache-Control', 'no-store, private');
    res.setHeader('Surrogate-Control', 'no-store');

    // Resolve latest/published scope from the request
    const scope = deliveryApi.getServerSideVersionStatus(req);
    const accessToken = getAccessToken(accessTokens, PROJECT, scope);

    // No token for this scope, or it isn't protected and is already in the page
    // (app is likely misconfigured if we're here - should never need it)
    if (!accessToken?.token || !accessToken.requireLogin)
      return res.status(404).json({ message: 'Not found' });

    // Only resolve the caller's groups when this scope actually restricts the
    // token to user groups; a plain `requireLogin: true` needs only a valid user
    const requireGroups =
      Array.isArray(accessToken.requireLogin) &&
      accessToken.requireLogin.length > 0;

    const { bearerToken, refreshToken } = getRequestCredentials(req);
    const [err, user] = await to(
      authenticateRequest(bearerToken, refreshToken, requireGroups)
    );

    if (err) logError('[accessTokenApi] authenticateRequest error', err);
    if (!user) return res.status(401).json({ message: 'Not authenticated' });

    // Group-restricted token: only release it to a caller who is a member of
    // at least one of the configured groups. `matchUserGroup` passes booleans
    // and empty arrays through, so `requireLogin: true` behaves as before.
    // A user with no resolvable groups fails closed.
    if (!matchUserGroup(user.groups, accessToken.requireLogin))
      return res.status(403).json({
        message: 'Not a member of a required user group',
      });

    return res.json({ accessToken: accessToken.token });
  };

export default makeAccessTokenApi;
