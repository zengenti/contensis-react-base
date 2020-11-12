// import { put } from 'redux-saga/effects';
// import { GET_SITE_CONFIG } from '~/core/redux/siteConfig/types';

export default {
  onRouteLoad: async ({ path }) => {
    // eslint-disable-next-line no-console
    await console.log('onRouteLoadEvent', path);
  },
  onRouteLoaded: function* onRouteLoaded(action) {
    // eslint-disable-next-line no-console
    yield console.log('onRouteLoadedEvent', action.path);

    // yield put({ type: GET_SITE_CONFIG });

    return {
      // requireLogin: (action.path !== '/' && [{ name: 'Beta Usersz' }]) || false,
    };
  },
};
