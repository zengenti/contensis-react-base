import { error } from 'loglevel';

export const isApiError = (
  e: unknown
): e is {
  status: number;
  statusText: string;
  url?: string;
  data?: {
    logId?: string;
    message?: string;
    data?: { responseDuration: string };
    type: string;
  };
} => !!e && typeof e === 'object' && 'status' in e && 'statusText' in e;

export const isPlainError = (e: unknown): e is Error =>
  !!e &&
  typeof e === 'object' &&
  'message' in e &&
  typeof e.message === 'string';

export const logError = (prefix: string, e: unknown) => {
  const message = isApiError(e)
    ? `${prefix} ${e.status} "${e.data?.message || ''}" url: ${e.url || ''}`
    : isPlainError(e)
      ? `${prefix} "${e?.message || e}"${e?.stack ? `\n${e.stack}` : ''}`
      : `${prefix} "${e}"`;

  error(message);
};

export const shorten = (str: string, maxLength = 120, endWeight = 0.6) => {
  if (!str || str.length <= maxLength) return str;
  const charsToShow = maxLength - 3;
  const back = Math.floor(charsToShow * endWeight);
  const front = charsToShow - back;
  return `${str.slice(0, front)}...${str.slice(str.length - back)}`;
};
