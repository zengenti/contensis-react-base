const stringifyStrings = obj => {
  const returnObj = Array.isArray(obj) ? [] : {};
  Object.entries(obj).forEach(([key, value]) => {
    switch (typeof value) {
      case 'string':
        returnObj[key] = JSON.stringify(value);
        break;
      case 'object':
        returnObj[key] = stringifyStrings(value);
        break;
      default:
        returnObj[key] = value;
        break;
    }
  });
  return returnObj;
};

module.exports = stringifyStrings;
