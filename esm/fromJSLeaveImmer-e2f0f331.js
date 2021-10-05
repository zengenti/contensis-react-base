import { Seq } from 'immutable';

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? Seq(js).map(fromJSOrdered).toList() : Seq(js).map(fromJSOrdered).toOrderedMap();
};

var fromJSOrdered$1 = fromJSOrdered;

const fromJSLeaveImmer = js => {
  const immutableObj = fromJSOrdered$1(js);

  if (immutableObj && 'set' in immutableObj && typeof immutableObj.set === 'function') {
    // convert the immer parts of the state back
    // to plain JS while retuning an immutable state object
    let immutableState = immutableObj;
    ['immer', 'form', 'navigation', 'routing', 'search', 'user', 'version'].map(key => {
      if (js[key] && immutableObj.get(key)) immutableState = immutableState.set(key, js[key]);
    });
    return immutableState;
  }

  return immutableObj;
};

export { fromJSLeaveImmer as default };
//# sourceMappingURL=fromJSLeaveImmer-e2f0f331.js.map
