const ensureLeadingSlash = (value: string) =>
  value.startsWith('/') ? value : `/${value}`;

const trimTrailingSlash = (value: string) =>
  value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value;

export const normalizePath = (raw?: string) => {
  if (raw === undefined || raw === null) return '';
  const trimmed = String(raw).trim();
  if (!trimmed) return '';
  if (trimmed === '/') return '/';
  return trimTrailingSlash(ensureLeadingSlash(trimmed));
};

export const normalizeSubsitePath = (raw?: string) => {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed || trimmed === '/') return '';
  return trimTrailingSlash(ensureLeadingSlash(trimmed));
};

export const applySubsitePath = (path: string, subsitePath: string) => {
  if (!subsitePath) return path;
  if (!path) return subsitePath;
  if (path === '/') return subsitePath;
  if (path.startsWith(subsitePath)) return path;
  return `${subsitePath}${path.startsWith('/') ? '' : '/'}${path}`;
};

export const stripSubsitePath = (path: string, subsitePath: string) => {
  if (!subsitePath) return path;
  if (!path.startsWith(subsitePath)) return path;
  const stripped = path.slice(subsitePath.length);
  return stripped ? stripped : '/';
};
