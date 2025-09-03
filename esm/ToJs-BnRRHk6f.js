import React from 'react';

/* eslint-disable react/display-name */
const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    const propKey = wrappedComponentProp[KEY];
    const propValue = wrappedComponentProp[VALUE];
    newProps[propKey] = propValue && typeof propValue === 'object' && 'toJS' in propValue ? propValue.toJS() : propValue;
    return newProps;
  }, {});
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
};

export { toJS as t };
//# sourceMappingURL=ToJs-BnRRHk6f.js.map
