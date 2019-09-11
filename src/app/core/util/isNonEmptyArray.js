const isNonEmptyArray = val => {
  return Array.isArray(val) && val.length > 0;
};
export default isNonEmptyArray;
