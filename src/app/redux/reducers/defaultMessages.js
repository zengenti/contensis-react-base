import {
  SET_PILLS,
  SET_SIDE_BAR_LINKS,
  SET_GENERIC_COURSE_MESSAGES,
  SET_ADDITIONAL_SIDE_BAR_LINKS,
  SET_GLANCE_BAR_MESSAGES,
} from '../types/defaultMessages';
import { Map, fromJS, List } from 'immutable';

let initialState = Map({
  coursePills: new List(),
  sideBarLinks: new List(),
  glanceBarMessages: new List(),
  genericCourseMessages: new Map(),
  additionalSidebarLinks: new List(),
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PILLS: {
      return state.set('coursePills', fromJS(action.pills));
    }
    case SET_SIDE_BAR_LINKS: {
      return state.set('sideBarLinks', fromJS(action.links));
    }
    case SET_GLANCE_BAR_MESSAGES: {
      return state.set('glanceBarMessages', fromJS(action.glanceBarMessages));
    }
    case SET_ADDITIONAL_SIDE_BAR_LINKS: {
      return state.set(
        'additionalSidebarLinks',
        fromJS(action.additionalLinks)
      );
    }
    case SET_GENERIC_COURSE_MESSAGES: {
      return state.set(
        'genericCourseMessages',
        fromJS(action.genericCourseMessages)
      );
    }
    default:
      return state;
  }
};
