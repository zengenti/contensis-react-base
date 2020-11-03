import { call } from 'redux-saga/effects';
// import { put } from 'redux-saga/effects';
// import { GET_SITE_CONFIG } from '~/core/redux/siteConfig/types';

import { handleRequiresLoginSaga } from '~/features/login/redux/sagas';

export default {
  onRouteLoad: async ({ path }) => {
    // eslint-disable-next-line no-console
    await console.log('onRouteLoadEvent', path);
  },
  onRouteLoaded: function* onRouteLoaded(action) {
    // eslint-disable-next-line no-console
    yield console.log('onRouteLoadedEvent', action.path);

    yield call(handleRequiresLoginSaga, action);
    // yield put({ type: GET_SITE_CONFIG });
  },
};
