import express from 'express';
declare const staticAssets: (app: express.Express, { appRootPath, scripts, startupScriptFilename, staticFolderPath, staticRoutePath, staticRoutePaths, }: {
    appRootPath?: string | undefined;
    scripts?: {
        attributes?: {
            [key: string]: string;
        };
        startup?: string;
    } | undefined;
    startupScriptFilename?: string | undefined;
    staticFolderPath?: string | undefined;
    staticRoutePath?: string | undefined;
    staticRoutePaths?: string[] | undefined;
}) => void;
export default staticAssets;
