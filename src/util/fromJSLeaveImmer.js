import fromJSOrdered from './fromJSOrdered';

const fromJSLeaveImmer = js => {
  // console.info(js);
  // if (typeof js !== 'object' || js === null) return js;
  // // console.info(`from js - here is js ${JSON.stringify(js)}`);
  // const convertedObject = isOrdered ? OrderedMap() : fromJS({});
  // const keys = Object.keys(js);
  // keys.forEach(key => {
  //   if (key === 'immer') {
  //     convertedObject.set(key, js[key]);
  //     // console.info(`LOOK! - immer untouched bar root key "${key}"`);
  //   } else {
  //     // console.info(`LOOK! - normal immutable feature "${key}"`);
  //     convertedObject.set(key, isOrdered ? fromJSOrdered(js) : fromJS(js));
  //   }
  // });
  const immutableObj = fromJSOrdered(js);
  if (immutableObj && !!immutableObj.get('immer')) {
    immutableObj.set('immer', immutableObj.get('immer').toJS());
  }
  return immutableObj;
};
export default fromJSLeaveImmer;
