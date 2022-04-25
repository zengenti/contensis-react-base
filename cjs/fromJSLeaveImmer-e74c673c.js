'use strict';

var immutable = require('immutable');

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null ? js : Array.isArray(js) ? immutable.Seq(js).map(fromJSOrdered).toList() : immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
};

var fromJSOrdered$1 = fromJSOrdered;

const fromJSLeaveImmer = js => {
  const immutableObj = fromJSOrdered$1(js);

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

exports["default"] = fromJSLeaveImmer;
//# sourceMappingURL=fromJSLeaveImmer-e74c673c.js.map
