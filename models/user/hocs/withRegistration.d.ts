export default withRegistration;
declare function withRegistration(WrappedComponent: any): import("react-redux").ConnectedComponent<(wrappedComponentProps: {
    [key: string]: any;
}) => JSX.Element, import("react-redux").Omit<{
    [key: string]: any;
}, "error" | "isLoading" | "user" | "registerUser" | "isSuccess">>;
