import { now } from '~/core/util/performance';
import { cachedSearch } from '~/core/util/ContensisDeliveryApi';
import { buildUrl } from '~/core/util/navigation';

export function fixFreeTextForElastic(s) {
  let illegalChars = ['>', '<'];
  let encodedChars = [
    '+',
    '-',
    '=',
    '&',
    '|',
    '!',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '^',
    '"',
    '~',
    '*',
    '?',
    ':',
    '\\',
    '/',
  ];

  let illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  let encodedRegEx = new RegExp(encodedChars.map(c => '\\' + c).join('|'), 'g');

  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);
  return s;
}

export const timedSearch = async (query, linkDepth, projectId) => {
  let duration = 0;

  const start = now();
  const payload = await cachedSearch.search(query, linkDepth, projectId);
  const end = now();

  duration = end - start;

  return { duration, payload };
};

export const extractQuotedPhrases = searchTerm => {
  const pattern = new RegExp(
    /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/gm
  );

  return (searchTerm.match(pattern) || []).map(match =>
    match.replace(/"/g, '')
  );
};

export const callCustomApi = async (customApi, filters) => {
  let uri = buildUrl(customApi.get('uri'), filters);
  if (!uri) return null;
  if (typeof window == 'undefined' && uri.startsWith('/'))
    uri = `http://localhost:3001${uri}`;

  const response = await fetch(uri);
  return await response.json();
};
