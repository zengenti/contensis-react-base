export const hasNavigationTree = state => {
  return state.getIn(['navigation', 'isReady']);
};

export const selectNavigationRoot = state => {
  return state.getIn(['navigation', 'root']);
};

export const selectNavigationDepends = state => {
  return state.getIn(['navigation', 'treeDepends']);
};
