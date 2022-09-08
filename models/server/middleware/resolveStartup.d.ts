import { RequestHandler } from 'express';
/**
 *
 * @param { appRootPath: string; maxage: number; staticFolderPath: string, startupScriptFilename: string } args
 * @returns Response | next()
 * A middleware function to resolve /dist/static/startup.js under a supplied startupScriptFilename variable
 */
export declare const resolveStartupMiddleware: ({ appRootPath, maxage, staticFolderPath, startupScriptFilename, }: {
    appRootPath: string;
    maxage: string;
    staticFolderPath: string;
    startupScriptFilename: string;
}) => RequestHandler;
