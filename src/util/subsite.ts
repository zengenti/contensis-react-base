import type { Request } from 'express';

declare let window: typeof globalThis & {
  subsitePath: string | undefined;
};

const isSSR = typeof window === 'undefined';

const ensureLeadingSlash = (value: string) =>
  value.startsWith('/') ? value : `/${value}`;

const trimTrailingSlash = (value: string) =>
  value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value;

const normalizeSubsitePath = (path?: string) => {
  const trimmed = `${path || ''}`.trim();
  if (!trimmed || trimmed === '/') return '';
  return trimTrailingSlash(ensureLeadingSlash(trimmed));
};

const addSubsitePath = (path: string, subsitePath: string) => {
  if (!path || path === '/') return subsitePath;
  if (path.startsWith(subsitePath)) return path;
  return `${subsitePath}${path.startsWith('/') ? '' : '/'}${path}`;
};

const trimSubsitePath = (path: string, subsitePath: string) => {
  if (!path.startsWith(subsitePath)) return path;
  const stripped = path.slice(subsitePath.length);
  return stripped ? stripped : '/';
};

/**
 * Retrieves a subsite path from the request headers in SSR or the global window object in CSR.
 * @param request The SSR request.
 * @returns The normalized subsite path.
 */
export const getSubsitePath = (request?: Request) =>
  isSSR
    ? normalizeSubsitePath(request?.headers?.['subsite_path'] as string)
    : window.subsitePath;

export const transformPathForSubsite = (
  path: string,
  request?: Request
): {
  clientPath: string;
  contentPath: string;
  subsitePath?: string;
} => {
  const subsitePath = getSubsitePath(request);
  if (!subsitePath) return { clientPath: path, contentPath: path };

  return {
    clientPath: isSSR ? trimSubsitePath(path, subsitePath) : path,
    contentPath: isSSR ? path : addSubsitePath(path, subsitePath),
    subsitePath,
  };
};
