import { OrderedMap } from 'immutable';
import fromJSOrdered from './fromJSOrdered';

const fromJSLeaveImmer = js => {
  console.info(js);
  if (typeof js !== 'object' || js === null) return js;
  console.info(`from js - here is js ${JSON.stringify(js)}`);
  const convertedObject = OrderedMap();
  const keys = Object.keys(js);
  keys.forEach(key => {
    if (key.startsWith('immer_')) {
      convertedObject.set(key, js[key]);
      console.info(`LOOK! - immer untouched bar root key "${key}"`);
    } else {
      console.info(`LOOK! - normal immutable feature "${key}"`);
      convertedObject.set(key, fromJSOrdered(js));
    }
  });
};

export default fromJSLeaveImmer;
