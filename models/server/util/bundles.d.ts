import { ChunkExtractor } from '@loadable/server';
import { ServerConfig } from "../../config";
export declare const loadableBundleData: ({ stats, templates }: {
    stats: any;
    templates: any;
}, staticRoutePath: string, build?: string | undefined) => {
    stats?: string | null | undefined;
    templates?: {
        templateHTML: any;
        templateHTMLStatic: any;
        templateHTMLFragment: any;
    } | null | undefined;
};
declare type LoadableChunkExtractors = {
    legacy: ChunkExtractor;
    modern: ChunkExtractor;
    commonLoadableExtractor: ChunkExtractor;
} | undefined;
export declare const loadableChunkExtractors: () => LoadableChunkExtractors;
export declare const getBundleData: (config: any, staticRoutePath: any) => {
    default: {
        stats?: string | null | undefined;
        templates?: {
            templateHTML: any;
            templateHTMLStatic: any;
            templateHTMLFragment: any;
        } | null | undefined;
    };
    legacy: {
        stats?: string | null | undefined;
        templates?: {
            templateHTML: any;
            templateHTMLStatic: any;
            templateHTMLFragment: any;
        } | null | undefined;
    };
    modern: {
        stats?: string | null | undefined;
        templates?: {
            templateHTML: any;
            templateHTMLStatic: any;
            templateHTMLFragment: any;
        } | null | undefined;
    };
};
export declare const buildBundleTags: (bundles: any, differentialBundles?: boolean, staticRoutePath?: string, attributes?: string) => any;
export declare const getBundleTags: (loadableExtractor: LoadableChunkExtractors, scripts: ServerConfig['scripts'], staticRoutePath?: string) => string;
export {};
