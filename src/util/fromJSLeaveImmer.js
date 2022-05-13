import fromJSOrdered from './fromJSOrdered';

const fromJSLeaveImmer = js => {
  const immutableObj = fromJSOrdered(js);
  if (
    immutableObj &&
    'set' in immutableObj &&
    typeof immutableObj.set === 'function'
  ) {
    // convert the immer parts of the state back
    // to plain JS while retuning an immutable state object
    let immutableState = immutableObj;
    [
      'immer',
      'form',
      'forms',
      'navigation',
      'routing',
      'search',
      'user',
      'version',
    ].map(key => {
      if (js[key] && immutableObj.get(key))
        immutableState = immutableState.set(key, js[key]);
    });
    return immutableState;
  }
  return immutableObj;
};
export default fromJSLeaveImmer;
