import { call } from 'redux-saga/effects';
import { OnRouteLoadedArgs, RouteLoadedOptions } from '~/models';
import { reduxInjectorSaga } from '~/redux/sagas/injector';
import { SearchRouteOptions } from '~/search/models/SearchActions';

type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

/**
 * @description Asynchronously load and inject assets related to Search
 */
const importSearchAssets = () => import('~/search');

/**
 * Invokes the Search saga if:
 * - `searchOptions` is present on `staticRoute` or `contentTypeRoute`
 * - `searchOptions` is provided by the consumer app
 *   - and path starts with one of `onPaths: ['/search']`
 *   - or a `facet` or `listingType` is present in provided `searchOptions`
 *
 * A `config` is required if we want to inject the redux reducer here, sagas are injected automatically
 */
export function* handleSearchSaga({
  location,
  params,
  routeSearchOptions,
  searchOptions,
  ssr,
}: OnRouteLoadedArgs &
  RouteLoadedOptions & { routeSearchOptions: SearchRouteOptions }) {
  const { onPaths = ['/search'], ...searchOpts } = {
    ...(routeSearchOptions || {}),
    ...(searchOptions || {}),
  };

  // Check do we meet conditions to run the search saga
  if (
    onPaths.find(p => location.pathname.startsWith(p)) ||
    searchOpts.facet ||
    searchOpts.listingType
  ) {
    // Async load search assets
    const { reducer, sagas, setRouteFilters } =
      (yield importSearchAssets()) as Awaited<
        ReturnType<typeof importSearchAssets>
      >;

    // Inject search reducer and sagas
    yield call(reduxInjectorSaga, async () => ({
      key: 'search',
      reducer: searchOpts.config && reducer(searchOpts.config),
      saga: sagas,
    }));

    yield call(setRouteFilters, {
      params,
      ssr,
      ...searchOpts,
    });
  }
}
