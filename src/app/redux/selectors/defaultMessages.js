export const getAllMessages = state =>
  state.getIn(['defaultMessages', 'messages']);

export const getDefaultTabMessages = (state, tabName) => {
  return state.getIn(['defaultMessages', 'genericCourseMessages', tabName]);
};
export const getPills = state =>
  state.getIn(['defaultMessages', 'coursePills']);

export const getDefaultSidebarLinks = state =>
  state.getIn(['defaultMessages', 'sideBarLinks']);

export const getAdditionalSidebarLinks = state =>
  state.getIn(['defaultMessages', 'additionalSidebarLinks']);

export const getGlanceBarMessages = state =>
  state.getIn(['defaultMessages', 'glanceBarMessages']);
