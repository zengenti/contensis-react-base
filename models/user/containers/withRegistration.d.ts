export default withRegistration;
declare function withRegistration(WrappedComponent: any): import("react-redux").ConnectedComponent<(wrappedComponentProps: any) => JSX.Element, import("react-redux").Omit<any, "isLoading" | "user" | "error" | "registerUser" | "isSuccess">>;
