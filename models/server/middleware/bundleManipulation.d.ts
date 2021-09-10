import { RequestHandler } from 'express';
export declare const bundleManipulationMiddleware: ({ appRootPath, maxage, staticRoutePath, }: {
    appRootPath: string;
    maxage: string;
    staticRoutePath: string;
}) => RequestHandler;
