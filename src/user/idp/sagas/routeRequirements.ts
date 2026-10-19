/**
 * Does this route need a member, and which groups? Routing decides from three
 * sources — the matched static route, the entry's content type mapping, and
 * whatever the app returned from `onRouteLoaded` — and the IDP sagas have to
 * agree with all three. The session check asks before any content exists and the
 * require-login saga asks again afterwards, so it is answered once, here.
 */
import { findContentTypeMapping } from '~/routing/util/find-contenttype-mapping';

const asArray = (value: unknown) => (Array.isArray(value) ? value : []);

export type RouteRequirements = {
  requiresLogin: boolean;
  requiresGroups: unknown[];
};

export const routeRequirements = (
  action: any,
  entry: any
): RouteRequirements => {
  const { requireLogin: authRoute } = action?.staticRoute?.route || {};
  const mappings = action?.routes?.ContentTypeMappings;
  const { requireLogin: authContentType } =
    ((Array.isArray(mappings) && entry?.sys?.contentTypeId
      ? findContentTypeMapping(mappings, entry.sys.contentTypeId)
      : undefined) || {}) as { requireLogin?: unknown };

  return {
    requiresLogin: !!authContentType || !!authRoute || !!action?.requireLogin,
    requiresGroups: [
      ...asArray(authContentType),
      ...asArray(authRoute),
      ...asArray(action?.requireLogin),
    ],
  };
};
