export const selectGlobalNavigationKey = state =>
  state.getIn(['app', 'settings', 'globalNavigation', 'sys', 'slug']);
export const selectAppSettings = state => state.getIn(['app', 'settings']);
export const selectGlobalSearchKey = state =>
  state.getIn(['app', 'settings', 'globalSearch', 'sys', 'slug']);
export const selectAppInitialised = state =>
  state.getIn(['app', 'appInitialised']);
export const selectAppInitialising = state =>
  state.getIn(['app', 'appInitialising']);
