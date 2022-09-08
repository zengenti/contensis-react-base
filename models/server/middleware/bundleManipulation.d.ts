import { RequestHandler } from 'express';
export declare const bundleManipulationMiddleware: ({ appRootPath, maxage, staticFolderPath, staticRoutePath, }: {
    appRootPath: string;
    maxage: string;
    staticFolderPath: string;
    staticRoutePath: string;
}) => RequestHandler;
