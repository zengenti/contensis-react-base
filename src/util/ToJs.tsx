/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';

export const toJS =
  <Props extends { [key: string]: any }>(
    WrappedComponent: React.ComponentType<Props>
  ): React.ComponentType<Props> =>
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
