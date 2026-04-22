import type { Request } from 'express';
/**
 * Retrieves a subsite path from the request headers in SSR or the global window object in CSR.
 * @param request The SSR request.
 * @returns The normalized subsite path.
 */
export declare const getSubsitePath: (request?: Request) => string | undefined;
export declare const transformPathForSubsite: (path: string, request?: Request) => {
    clientPath: string;
    contentPath: string;
    subsitePath?: string;
};
