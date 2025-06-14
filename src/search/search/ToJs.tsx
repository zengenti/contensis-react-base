/* eslint-disable react/display-name */
import React from 'react';

export const toJS =
  <Props extends { [key: string]: any }>(
    WrappedComponent: (props: Props) => React.JSX.Element
  ) =>
  (wrappedComponentProps: Props) => {
    const KEY = 0;
    const VALUE = 1;

    const propsJS = Object.entries(wrappedComponentProps).reduce<Props>(
      (newProps: any, wrappedComponentProp) => {
        const propKey = wrappedComponentProp[KEY];
        const propValue = wrappedComponentProp[VALUE];
        newProps[propKey] =
          propValue && typeof propValue === 'object' && 'toJS' in propValue
            ? propValue.toJS()
            : propValue;
        return newProps as Props;
      },
      {} as Props
    );

    return <WrappedComponent {...propsJS} />;
  };
