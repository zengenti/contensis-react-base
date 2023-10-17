import React from 'react';
export declare const toJS: <Props extends {
    [key: string]: any;
}>(WrappedComponent: React.ComponentType<Props>) => (wrappedComponentProps: Props) => JSX.Element;
