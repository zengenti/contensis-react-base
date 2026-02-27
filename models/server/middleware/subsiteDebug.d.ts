import { RequestHandler } from 'express';
/**
 * Development proxy for Subsite PoC
 * Catch all routes before they hit CRB handlers
 * and rewrite them to include the subsite base path,
 * this allows us to run the subsite in a subfolder in development
 * In production we will handle this with a path rewrite in the Cloud Dashboard site configuration,
 * @param subsitePath the content base path we will rewrite to
 * @param exceptions an array of path prefixes to ignore when rewriting, useful for ignoring assets that do not live in the subsite base path
 */
export declare const subsiteDebugMiddleware: (subsitePath: string, exceptions?: string[]) => RequestHandler;
