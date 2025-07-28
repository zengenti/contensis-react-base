'use strict';

var immutable = require('immutable');

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? immutable.Seq(js).map(fromJSOrdered).toList() : immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
};

const fromJSLeaveImmer = js => {
  const immutableObj = fromJSOrdered(js);
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

exports.default = fromJSLeaveImmer;
//# sourceMappingURL=fromJSLeaveImmer-Blvlk4t2.js.map
