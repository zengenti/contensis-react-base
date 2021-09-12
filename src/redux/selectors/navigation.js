import { getImmutableOrJS as getIn } from '~/redux/util';

export const hasNavigationTree = state =>
  getIn(state, ['navigation', 'isReady']);

export const selectNavigationRoot = state =>
  getIn(state, ['navigation', 'root']);

export const selectNavigationDepends = state =>
  getIn(state, ['navigation', 'treeDepends']);
