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

/** Between a navigation and its `SET_ENTRY` the routing state still holds the
 *  *previous* route's entry, so a caller arriving without one (the release
 *  check, a Delivery auth error) may only trust the entry in state when it
 *  belongs to this path — the same membership test the routing reducer uses.
 *  Anything else counts as no entry, exactly as before an entry was loaded. */
export const entryForPath = (entry: any, path?: string): any => {
  const uri = entry?.sys?.uri;
  if (!uri || !path) return undefined;
  return uri === path || uri === path.split('?')[0] ? entry : undefined;
};

/** The entry that describes this route. Both IDP sagas resolve it the same way:
 *  the routing action's own entry wins, and the one in state counts only while
 *  it belongs to this path. */
export const resolveEntry = (action: any, stateEntry: any): any =>
  action?.entry || entryForPath(stateEntry, action?.path);
