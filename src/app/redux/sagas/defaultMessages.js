// import * as log from 'loglevel';
import { put, select, fork } from 'redux-saga/effects';
import { deliveryApi, Query, Op } from '../../util/ContensisDeliveryApi';
import {
  SET_PILLS,
  SET_SIDE_BAR_LINKS,
  SET_GENERIC_COURSE_MESSAGES,
  SET_ADDITIONAL_SIDE_BAR_LINKS,
  SET_GLANCE_BAR_MESSAGES,
} from '../types/defaultMessages';

import { selectRouteEntry } from '../selectors/routing';
import ProjectHelper from '../../util/helpers';
import { getVersionStatus } from '../selectors/version';

export function* getMessages() {
  const state = yield select();
  const currentRecord = selectRouteEntry(state);
  debugger;
  let versionStatus = null;
  try {
    versionStatus = getVersionStatus(state);
  } catch (e) {
    /* eslint-disable no-console */
    console.log('error');
    debugger;
    /* eslint-enable no-console */
  }
  const ContentType = currentRecord.getIn(['sys', 'contentTypeId']);
  if (ContentType === 'course') {
    try {
      const query = new Query(
        Op.equalTo('sys.versionStatus', versionStatus),
        Op.equalTo('sys.contentTypeId', 'courseMessage')
      );
      query.pageSize = 50;
      const payload = yield deliveryApi.search(query, 3);

      // yield put({ type: SET_MESSAGES, payload: payload });
      yield fork(populateMessages, payload.items);
    } catch (error) {
      //log.warn(error);
    }
    /* eslint-enable no-console */
  }
}

function* populateMessages(messages) {
  const state = yield select();
  // const messages = getAllMessages(state).toJS();
  const currentCourse = selectRouteEntry(state).toJS();
  // Set-up Pills
  const pills = ProjectHelper.GetPillItems(messages, currentCourse);
  yield put({ type: SET_PILLS, pills });
  // Set-up Side Bar Links
  const links = ProjectHelper.GetSidebarLinks(messages, currentCourse);
  yield put({ type: SET_SIDE_BAR_LINKS, links });
  // Get glance bar override content
  const glanceBarMessages = ProjectHelper.GetGlanceBarMessages(
    messages,
    currentCourse
  );
  yield put({ type: SET_GLANCE_BAR_MESSAGES, glanceBarMessages });
  //Additional links (Subject Areas, Links in the course)
  const additionalLinks = ProjectHelper.GetAdditionalLinks(currentCourse);
  yield put({ type: SET_ADDITIONAL_SIDE_BAR_LINKS, additionalLinks });

  const genericCourseMessages = {
    aboveFeesMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Fees & Funding',
      true
    ),
    belowFeesMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Fees & Funding',
      false
    ),
    aboveERMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Entry Requirements',
      true
    ),
    belowERMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Entry Requirements',
      false
    ),
    aboveIntERMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'International Entry Requirements',
      true
    ),
    belowIntERMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'International Entry Requirements',
      false
    ),
    aboveOverviewMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Overview',
      true
    ),
    belowOverviewMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Overview',
      false
    ),
    aboveTeachingMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Teaching & Learning',
      true
    ),
    belowTeachingMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Teaching & Learning',
      false
    ),
    aboveAssessmentMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Assessment & Feedback',
      true
    ),
    belowAssessmentMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Assessment & Feedback',
      false
    ),
    aboveModulesMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Course Content',
      true
    ),
    belowModulesMessages: ProjectHelper.GetTabMessages(
      messages,
      currentCourse,
      'Course Content',
      false
    ),
  };
  yield put({ type: SET_GENERIC_COURSE_MESSAGES, genericCourseMessages });
}
