import { getJS } from '../util';

const select = state => getJS(state, 'navigation');

export const hasNavigationTree = state => select(state)?.isReady;

export const selectNavigationRoot = state => select(state)?.root;

export const selectNavigationDepends = state => select(state)?.treeDepends;
