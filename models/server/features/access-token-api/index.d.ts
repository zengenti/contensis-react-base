import { Express, RequestHandler } from 'express';
import { AccessTokenConfig } from "../../../models/config/AccessTokenConfig";
/**
 * Release a protected access token to an authenticated caller.
 *
 * Preview and live sites are served by the same deployment, so the token a
 * caller receives is decided by the request, not by the uri they post to.
 *
 * This route is only registered when a scope is configured with `requireLogin`.
 */
export declare const makeAccessTokenApi: (app: Express, accessTokens?: AccessTokenConfig) => void;
/** Produces the request handler for the access token api */
export declare const makeAccessTokenMiddleware: (accessTokens?: AccessTokenConfig) => RequestHandler;
export default makeAccessTokenApi;
