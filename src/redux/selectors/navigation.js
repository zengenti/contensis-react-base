export const hasNavigationTree = state => state?.navigation?.isReady;

export const selectNavigationRoot = state => state?.navigation?.root;

export const selectNavigationDepends = state => state?.navigation?.treeDepends;
