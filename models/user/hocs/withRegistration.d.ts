export default withRegistration;
declare function withRegistration(WrappedComponent: any): import("react-redux").ConnectedComponent<(wrappedComponentProps: {
    [key: string]: any;
}) => import("react").JSX.Element, {
    [x: string]: any;
    [x: number]: any;
    context?: import("react").Context<import("react-redux").ReactReduxContextValue<any, import("../../../node_modules/redux").UnknownAction> | null> | undefined;
    store?: import("../../../node_modules/redux").Store | undefined;
}>;
