import { ChunkExtractor } from '@loadable/server';
import { ServerConfig } from "../../config";
export declare const loadableBundleData: ({ stats, templates }: ServerConfig, staticRoutePath: string, build?: string) => {
    stats?: string | null | undefined;
    templates?: {
        templateHTML: string;
        templateHTMLStatic: string;
        templateHTMLFragment: string;
    } | null | undefined;
};
type LoadableChunkExtractors = {
    legacy?: ChunkExtractor;
    modern?: ChunkExtractor;
    commonLoadableExtractor: ChunkExtractor;
};
export declare const loadableChunkExtractors: () => LoadableChunkExtractors;
export declare const getBundleData: (config: ServerConfig, staticRoutePath: string) => {
    default: {
        stats?: string | null | undefined;
        templates?: {
            templateHTML: string;
            templateHTMLStatic: string;
            templateHTMLFragment: string;
        } | null | undefined;
    };
    legacy: {
        stats?: string | null | undefined;
        templates?: {
            templateHTML: string;
            templateHTMLStatic: string;
            templateHTMLFragment: string;
        } | null | undefined;
    };
    modern: {
        stats?: string | null | undefined;
        templates?: {
            templateHTML: string;
            templateHTMLStatic: string;
            templateHTMLFragment: string;
        } | null | undefined;
    };
};
export declare const getBundleTags: (loadableExtractor: LoadableChunkExtractors, scripts: ServerConfig['scripts'], staticRoutePath?: string) => string;
export {};
