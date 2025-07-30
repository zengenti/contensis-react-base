/**
 * Add assets to templateHTML in the positions represented
 * by replacing specific keys wrapped in handlebars depending
 * on the accessMethod(s) that have been set (or updated)
 * while processing the request
 */
export declare const replaceHtml: ({ bundleTags, html, htmlAttributes, metadata, state, styleTags, title, templateHTML, templateHTMLFragment, templateHTMLStatic, }: {
    bundleTags?: string | undefined;
    html?: string | undefined;
    htmlAttributes?: string | undefined;
    metadata?: string | undefined;
    state?: string | undefined;
    styleTags?: string | undefined;
    title?: string | undefined;
    templateHTML?: string | undefined;
    templateHTMLFragment?: string | undefined;
    templateHTMLStatic?: string | undefined;
}, accessMethod: {
    DYNAMIC: boolean;
    REDUX: boolean;
    FRAGMENT: boolean;
    STATIC: boolean;
}) => string;
