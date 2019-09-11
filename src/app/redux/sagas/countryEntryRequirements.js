import * as log from 'loglevel';
import { takeEvery, put, select } from 'redux-saga/effects';
import { cachedSearch } from 'app/util/ContensisDeliveryApi';
import { now } from '../../util/performance';
import { deliveryApi } from '../../util/ContensisDeliveryApi';
import { fromJS } from 'immutable';
import {
  GET_COUNTRIES,
  SET_COUNTRY,
  SET_COUNTRY_REQUIREMENTS,
} from '../types/countryEntryRequirements';
import { getEntryEquivilents } from 'app/util/search';
import {
  getSelectedCountry,
  getCourseEntryRequirementGrade,
  getCountries,
} from '../selectors/countryEntryRequirements';
import ProjectHelper from '../../util/helpers';
import { selectRouteEntry } from '../selectors/routing';
import { selectVersionStatus } from '../selectors/version';
export const countryEntryRequirementsSagas = [
  takeEvery(SET_COUNTRY, setCountry),
];

export function* fetchCountries() {
  const state = yield select();
  const currentRecord = selectRouteEntry(state);
  const currentCountries = getCountries(state);
  if (currentCountries.size == 0) {
    // Check The Entry is Of type course from the action
    // Check I have no default messages allready.
    /* eslint-disable no-console */
    // debugger;
    const ContentType = currentRecord.getIn(['sys', 'contentTypeId']);

    if (ContentType === 'course') {
      try {
        const payload = yield cachedSearch.getTaxonomyNode('0/1521/1529'); //International/Countries
        yield put({ type: GET_COUNTRIES, payload: payload });
      } catch (error) {
        //log.warn(error);
      }
      /* eslint-enable no-console */
    }
  }
}

function* setCountry() {
  const state = yield select();
  const country = getSelectedCountry(state);
  const versionStatus = selectVersionStatus(state);
  try {
    try {
      if (country === '') {
        yield put({
          type: SET_COUNTRY_REQUIREMENTS,
          payload: [],
        });
      } else {
        const query = getEntryEquivilents(country, versionStatus);
        query.fields = ['title', 'equivalent', 'entryEquivalents'];
        let duration = 0;
        const start = now();
        const payload = yield deliveryApi.search(query, 1);
        const end = now();
        duration = end - start;
        if (payload.type == 'error') {
          log.warn(`Error Executing Query ${JSON.stringify(query)}`);
          yield put({
            type: SET_COUNTRY_REQUIREMENTS,
            payload: {
              items: [],
            },
            duration,
          });
        } else {
          let courseGrade = getCourseEntryRequirementGrade(state);
          // if (currentCourse) currentCourse = currentCourse;
          let countryRequirementsMessages = ProjectHelper.FilterCountryRequirementMessages(
            fromJS(payload.items),
            courseGrade
          );
          if (countryRequirementsMessages.length == 0) {
            countryRequirementsMessages = [
              { title: 'Please Contact Admissions using the link below' },
            ];
          }
          yield put({
            type: SET_COUNTRY_REQUIREMENTS,
            payload: countryRequirementsMessages,
            duration,
          });
          log.info(`${SET_COUNTRY_REQUIREMENTS} Got Results payload`);
        }
      }

      // const end = window.performance.now();
    } catch (error) {
      log.warn(error);
    }
  } catch (error) {
    //log.warn(error);
  }
  /* eslint-enable no-console */
}
