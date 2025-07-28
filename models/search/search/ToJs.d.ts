import React from 'react';
export declare const toJS: <Props extends {
    [key: string]: any;
}>(WrappedComponent: (props: Props) => React.JSX.Element) => (wrappedComponentProps: Props) => React.JSX.Element;
