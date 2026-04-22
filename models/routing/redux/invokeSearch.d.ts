import { OnRouteLoadedArgs, RouteLoadedOptions } from "../../models";
import { SearchRouteOptions } from "../../search/models/SearchActions";
/**
 * Invokes the Search saga if:
 * - `searchOptions` is present on `staticRoute` or `contentTypeRoute`
 * - `searchOptions` is provided by the consumer app
 *   - and path starts with one of `onPaths: ['/search']`
 *   - or a `facet` or `listingType` is present in provided `searchOptions`
 *
 * A `config` is required if we want to inject the redux reducer here, sagas are injected automatically
 */
export declare function handleSearchSaga({ location, params, routeSearchOptions, searchOptions, ssr, }: OnRouteLoadedArgs & RouteLoadedOptions & {
    routeSearchOptions: SearchRouteOptions;
}): Generator<import("redux-saga/effects").CallEffect<void> | Promise<typeof import("../../search")> | import("redux-saga/effects").CallEffect<Generator<Promise<{
    key: string;
    reducer: any;
    saga: any;
}>, void, {
    key: any;
    reducer: any;
    saga: any;
}>>, void, typeof import("../../search")>;
