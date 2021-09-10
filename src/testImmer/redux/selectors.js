// all of these example selectors return normal js, no immutable maps or lists,
// only the node the immer feature is on is part of an immutable object
// (hence having to use `.get` or `.getIn` on the root state object)
// this is handy as any components can directly use useSelectors without having
// to check for .toJS (see corresponding example reducer) or use a container wrapping props in toJS util
// e.g.
// import {selectTestObject} from '~/features/testImmer/selectors';
// const myObj = useSelector(selectTestObject);
// if(myObj.a === 'the letter b') return false;
export const selectTestFeature = state => state.get('immer_testFeature');
export const selectGreeting = state =>
  state.getIn(['immer', 'testFeature', 'myTestProp']);
export const selectTestObject = state =>
  state.getIn(['immer', 'testFeature', 'myTestObject']);
