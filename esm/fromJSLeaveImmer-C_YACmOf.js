import { Seq } from 'immutable';

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? Seq(js).map(fromJSOrdered).toList() : Seq(js).map(fromJSOrdered).toOrderedMap();
};
<<<<<<< HEAD:esm/fromJSLeaveImmer-0114ffcf.js

var fromJSOrdered$1 = fromJSOrdered;

const fromJSLeaveImmer = js => {
  const immutableObj = fromJSOrdered$1(js);

=======

const fromJSLeaveImmer = js => {
  const immutableObj = fromJSOrdered(js);
>>>>>>> master:esm/fromJSLeaveImmer-C_YACmOf.js
  if (immutableObj && 'set' in immutableObj && typeof immutableObj.set === 'function') {
    // convert the immer parts of the state back
    // to plain JS while retuning an immutable state object
    let immutableState = immutableObj;
    ['immer', 'form', 'forms', 'navigation', 'routing', 'search', 'user', 'version'].map(key => {
      if (js[key] && immutableObj.get(key)) immutableState = immutableState.set(key, js[key]);
    });
    return immutableState;
  }

  return immutableObj;
};

export { fromJSLeaveImmer as default };
<<<<<<< HEAD:esm/fromJSLeaveImmer-0114ffcf.js
//# sourceMappingURL=fromJSLeaveImmer-0114ffcf.js.map
=======
//# sourceMappingURL=fromJSLeaveImmer-C_YACmOf.js.map
>>>>>>> master:esm/fromJSLeaveImmer-C_YACmOf.js
