// Global server and build utils
export { default as setCachingHeaders } from '~/server/features/caching/setCachingHeaders';
export {
  cachedSearch,
  cachedSearchWithContext,
  cachedSearchWithCookies,
  deliveryApi,
  deliveryApiWithCookies,
  getClientConfig,
} from './ContensisDeliveryApi';

export {
  SSRContextProvider,
  useDeliveryApi,
  useSSRContext,
} from './SSRContext';

export { getSubsitePath } from './subsite';

export { default as stringifyStrings } from './stringifyStrings';
export { default as urls } from './urls';

// Hydration-safe approaches to defer rendering to browser
export { useIsClient } from './useIsClient';
export { NoSSR } from './NoSSR';

// Head/metadata management — re-exported so consumers can import Helmet
// from a stable path without a direct dependency on react-helmet-async
export { Helmet, HelmetProvider } from 'react-helmet-async';

// JSON mapping functions
export * from './json-mapper';

export { default as VersionInfo } from '~/app/pages/VersionInfo';

// Ponyfill
export { useHistory } from './donotuse_useHistory';
