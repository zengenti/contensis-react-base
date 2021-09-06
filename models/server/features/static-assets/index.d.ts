declare const staticAssets: (app: any, { appRootPath, scripts, startupScriptFilename, staticFolderPath, staticRoutePath, staticRoutePaths, }: {
    appRootPath?: any;
    scripts?: {
        attributes?: {
            [key: string]: string;
        } | undefined;
        startup?: string | undefined;
    } | undefined;
    startupScriptFilename?: string | undefined;
    staticFolderPath?: string | undefined;
    staticRoutePath?: string | undefined;
    staticRoutePaths?: string[] | undefined;
}) => void;
export default staticAssets;
