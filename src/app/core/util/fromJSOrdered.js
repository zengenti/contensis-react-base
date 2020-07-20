import { Seq } from 'immutable';

const fromJSOrdered = js => {
  return typeof js !== 'object' || js === null
    ? js
    : Array.isArray(js)
    ? Seq(js)
        .map(fromJSOrdered)
        .toList()
    : Seq(js)
        .map(fromJSOrdered)
        .toOrderedMap();
};

export default fromJSOrdered;
