import { takeEvery, put, call, all } from 'redux-saga/effects';
import { deliveryApi } from '~/core/util/ContensisDeliveryApi';
import {
  APP_INITIALISE,
  APP_SET_INITIALISED,
  APP_SET_SETTINGS,
  APP_SET_INITIALISING,
} from '../types/app';
import { initialiseNavigationSaga } from './navigation';
import { getSiteSettingsQuery } from '~/core/util/queries';

export const appSagas = [takeEvery(APP_INITIALISE, initialiseAppSaga)];

function* initialiseAppSaga() {
  yield put({ type: APP_SET_INITIALISING, appInitialising: true });
  yield all([call(getAppSettingsSaga), call(initialiseNavigationSaga)]);
  yield put({ type: APP_SET_INITIALISED });
  yield put({ type: APP_SET_INITIALISING, appInitialising: false });
}

function* getAppSettingsSaga() {
  const query = yield getSiteSettingsQuery();
  const result = yield deliveryApi.search(query, 2);
  if (result && result.items && result.items.length) {
    const settings = result.items[0];
    if (settings.sys) delete settings.sys;
    yield put({ type: APP_SET_SETTINGS, settings });
  }
}
