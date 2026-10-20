export type RouteRequirements = {
    requiresLogin: boolean;
    requiresGroups: unknown[];
};
export declare const routeRequirements: (action: any, entry: any) => RouteRequirements;
/** Between a navigation and its `SET_ENTRY` the routing state still holds the
 *  *previous* route's entry, so a caller arriving without one (the release
 *  check, a Delivery auth error) may only trust the entry in state when it
 *  belongs to this path — the same membership test the routing reducer uses.
 *  Anything else counts as no entry, exactly as before an entry was loaded. */
export declare const entryForPath: (entry: any, path?: string) => any;
/** The entry that describes this route. Both IDP sagas resolve it the same way:
 *  the routing action's own entry wins, and the one in state counts only while
 *  it belongs to this path. */
export declare const resolveEntry: (action: any, stateEntry: any) => any;
