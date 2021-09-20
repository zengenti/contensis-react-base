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
export declare const loadableChunkExtractors: () => {
    commonLoadableExtractor: {
        addChunk(chunk: any): void;
    };
    modern: any;
    legacy: any;
} | undefined;
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
export declare const getBundleTags: (loadableExtractor: any) => any;
