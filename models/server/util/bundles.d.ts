import { ChunkExtractor } from '@loadable/server';
import { ServerConfig } from "../../models";
export declare const loadableBundleData: ({ stats, templates }: ServerConfig, staticRoutePath: string, build?: string) => {
    stats?: string | null;
    templates?: {
        templateHTML: string;
        templateHTMLStatic: string;
        templateHTMLFragment: string;
    } | null;
};
type LoadableChunkExtractors = {
    legacy?: ChunkExtractor;
    modern?: ChunkExtractor;
    commonLoadableExtractor: ChunkExtractor;
};
export declare const loadableChunkExtractors: () => LoadableChunkExtractors;
export declare const getBundleData: (config: ServerConfig, staticRoutePath: string) => {
    default: {
        stats?: string | null;
        templates?: {
            templateHTML: string;
            templateHTMLStatic: string;
            templateHTMLFragment: string;
        } | null;
    };
    legacy: {
        stats?: string | null;
        templates?: {
            templateHTML: string;
            templateHTMLStatic: string;
            templateHTMLFragment: string;
        } | null;
    };
    modern: {
        stats?: string | null;
        templates?: {
            templateHTML: string;
            templateHTMLStatic: string;
            templateHTMLFragment: string;
        } | null;
    };
};
export declare const getBundleTags: (loadableExtractor: LoadableChunkExtractors, scripts: ServerConfig["scripts"], staticRoutePath?: string) => string;
export {};
